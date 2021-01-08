<!--
//  APIStats.vue
//
//  Created by Kalila L. on Jan 8 2021.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-card>
        <v-card-title>
            Metaverse API Request Stats for {{ $store.state.metaverseConfig.nickname }}
        </v-card-title>
        {{ currentRequestDateRange }}
        <v-list-item three-line class="mb-4">
            <v-radio-group
                v-model="metaverse.requests.which"
                mandatory
            >
                <v-radio
                    label="Hour"
                    value="perHour"
                ></v-radio>
                <v-radio
                    label="Day"
                    value="perDay"
                ></v-radio>
                <v-radio
                    label="Week"
                    value="perWeek"
                ></v-radio>
            </v-radio-group>
            <v-list-item-content>
                <v-sparkline
                    :value="currentRequestValueSet"
                    :gradient="gradient"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    :show-labels="true"
                    :auto-draw="true"
                >
                    <!-- <template v-slot:label="item">
                        {{ item.value }}
                    </template> -->
                </v-sparkline>
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
    name: 'APIStats',
    props: {
        source: String
    },
    data: () => ({
        metaverse: {
            requests: {
                which: 'perHour',
                currentValueSet: [],
                perHour: {
                    buckets: 0,
                    bucketsBegin: 0,
                    bucketsEnd: 0,
                    values: []
                },
                perDay: {
                    buckets: 0,
                    bucketsBegin: 0,
                    bucketsEnd: 0,
                    values: []
                },
                perWeek: {
                    buckets: 0,
                    bucketsBegin: 0,
                    bucketsEnd: 0,
                    values: []
                }
            }
        },
        gradient: ['#f72047', '#ffd200', '#1feaea']
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
        currentRequestValueSet () {
            return this.metaverse.requests[this.metaverse.requests.which].values;
        },
        currentRequestDateRange () {
            return this.metaverse.requests[this.metaverse.requests.which].bucketsBegin + ' to ' + this.metaverse.requests[this.metaverse.requests.which].bucketsEnd;
        }
    },

    methods: {
        initialize () {
            this.getAllStats();
        },

        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },

        processRequestStats: function (history, range, trimCounter) {
            var flatValues = history[range].values.flat(2);
            var reducedValues = [];

            var currentTrimElapsed = 0;
            for (var i = 0; i < flatValues.length; i++) {
                // Push every nth index value and push the first and final value.
                if (currentTrimElapsed === trimCounter || i === flatValues.length - 1 || i === 0) {
                    reducedValues.push(flatValues[i]);
                    currentTrimElapsed = 0;
                } else {
                    currentTrimElapsed++;
                }
            };

            this.metaverse.requests[range].values = reducedValues;
            this.metaverse.requests[range].buckets = history[range].buckets;

            var bucketsBeginDate = new Date(history[range].timeBase);
            var bucketsBeginString = bucketsBeginDate.getFullYear() + '-';
            bucketsBeginString += (bucketsBeginDate.getMonth() + 1) + '-';
            bucketsBeginString += bucketsBeginDate.getDate() + ' ';
            bucketsBeginString += bucketsBeginDate.getHours() + ':';
            bucketsBeginString += bucketsBeginDate.getMinutes() + ':';
            bucketsBeginString += bucketsBeginDate.getSeconds();
            this.metaverse.requests[range].bucketsBegin = bucketsBeginString;

            var bucketsEndDate = new Date(history[range].timeBase + (history[range].buckets * history[range].bucketMilliseconds));
            var bucketsEndString = bucketsEndDate.getFullYear() + '-';
            bucketsEndString += (bucketsEndDate.getMonth() + 1) + '-';
            bucketsEndString += bucketsEndDate.getDate() + ' ';
            bucketsEndString += bucketsEndDate.getHours() + ':';
            bucketsEndString += bucketsEndDate.getMinutes() + ':';
            bucketsEndString += bucketsEndDate.getSeconds();
            this.metaverse.requests[range].bucketsBegin = bucketsBeginString;
            this.metaverse.requests[range].bucketsEnd = bucketsEndString;
        },

        // BEGIN Handling requests to the API
        getAllStats () {
            var parameters = window.$.param({
                'asAdmin': store.account.useAsAdmin
            });
            parameters = '?' + parameters;

            window.$.ajax({
                type: 'GET',
                url: metaverseServer + '/api/v1/stats/category/server' + parameters,
                contentType: 'application/json'
            })
                .done(function (result) {
                    console.info('Successfully retrieved server API stats:', result);

                    vue_this.processRequestStats(result.data.server.apiRequests.history, 'perHour', 3);
                    vue_this.processRequestStats(result.data.server.apiRequests.history, 'perDay', 20);
                    vue_this.processRequestStats(result.data.server.apiRequests.history, 'perWeek', 20);
                })
                .fail(function (result) {
                    console.info('Failed to get server API stats:', result);
                    vue_this.generatedToken = result.responseJSON.error;
                    vue_this.generatedTokenText = '';

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to get server API stats.',
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
