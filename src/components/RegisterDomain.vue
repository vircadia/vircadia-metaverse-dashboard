<!--
//  RegisterDomain.vue
//
//  Created by Kalila L. on 29 Sep 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->
<script>
// This is temporary for rapid iteration.
/* eslint-disable */
</script>

<template>
    <v-card>
        <v-list-item three-line class="mb-4">
            <v-list-item-content>
                <v-list-item-title class="headline mb-4">
                    Register A Domain
                </v-list-item-title>
                <v-list-item-subtitle>
                    Use the access token that is generated to let your domain server log in to the metaverse.
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-list-item class="mb-4">
            <p class="overline text-center" style="width: 100%; font-size: 1.0rem !important" v-text="generatedToken"></p>
        </v-list-item>
        <v-list-item-subtitle v-text="generatedTokenText"></v-list-item-subtitle>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                rounded
                color="input"
                @click="postGenerateDomainToken()"
            >
                Generate
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { EventBus } from '../plugins/eventBus.js';
var vue_this;
var store;
var metaverseServer;

export default {
    name: 'DomainList',
    props: {
        source: String
    },
    data: () => ({
        generatedToken: null,
        generatedTokenText: 'Click "Generate" to create a token.'
    }),
    
    computed: {
    },

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
        },
        
        // BEGIN Handling requests to the API
        postGenerateDomainToken () {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin,
                "scope": "domain"
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'POST',
                url: metaverseServer + '/api/v1/token/new' + parameters,
                contentType: 'application/json'
            })
                .done(function (result) {
                    console.info('Successfully generated token:', result);
                    vue_this.generatedToken = result.data.token;
                    vue_this.generatedTokenText = 'Paste this token into your domain-server.';
                })
                .fail(function (result) {
                    console.info('Failed to generate token:', result);
                    vue_this.generatedToken = result.responseJSON.error;
                    vue_this.generatedTokenText = '';

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to generate token',
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
