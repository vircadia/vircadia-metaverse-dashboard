<!--
//  MetaverseStats.vue
//
//  Created by Kalila L. on 3 Nov 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-card>
        <v-card-title>
            Metaverse Stats for {{ $store.state.metaverseConfig.nickname }}
        </v-card-title>
        <v-list-item three-line class="mb-4">
            <v-list-item-content>
                <v-list-item-title class="headline mb-4">
                    {{ metaverse.activeDomains }} active domains
                </v-list-item-title>
                <v-list-item-title class="headline mb-4">
                    {{ metaverse.totalOnline }} online users
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import { EventBus } from '../../plugins/eventBus.js';

var vue_this;
var store;
var metaverseServer;

export default {
    name: 'MetaverseStats',
    props: {
        source: String
    },
    data: () => ({
        metaverse: {
            activeDomains: 0,
            domainAnonUsers: 0,
            domainTotalUsers: 0,
            totalOnline: 0
        }
    }),

    watch: {
    },

    created () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = store.metaverseConfig.server;

        this.initialize();
    },

    computed: {
    },

    methods: {
        initialize () {
            this.getAllStats();
        },

        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },

        // BEGIN Handling requests to the API
        getAllStats () {
            var parameters = window.$.param({
                'asAdmin': store.account.useAsAdmin
            });
            parameters = '?' + parameters;

            window.$.ajax({
                type: 'GET',
                url: metaverseServer + '/api/v1/stats/category/metaverse' + parameters,
                contentType: 'application/json'
            })
                .done(function (result) {
                    console.info('Successfully retrieved metaverse stats:', result);
                    vue_this.metaverse.activeDomains = result.data.metaverse.activeDomains.value;
                    vue_this.metaverse.domainAnonUsers = result.data.metaverse.domainAnonUsers.value;
                    vue_this.metaverse.domainTotalUsers = result.data.metaverse.domainTotalUsers.value;
                    vue_this.metaverse.totalOnline = result.data.metaverse.totalOnline.value;
                })
                .fail(function (result) {
                    console.info('Failed to get metaverse stats:', result);
                    vue_this.generatedToken = result.responseJSON.error;
                    vue_this.generatedTokenText = '';

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to get metaverse stats.',
                            code: '3',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        }
        // END Handling requests to the API
    }
}
</script>
