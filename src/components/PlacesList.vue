<!--
//  PlacesList.vue
//
//  Created by Kalila L. on 23 Sep 2020.
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
    <v-data-table
        :headers="headers"
        :items="places"
        sort-by="domain"
        class="elevation-1"
        @click:row="rowClicked"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Places</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <!-- PLACES DATA DIALOG -->
                <v-dialog
                    v-model="placeDialogShow"
                    width="500"
                    color="primary"
                >
                    <v-card>
                        <v-card-title>
                            {{ placeDialog.placeName }}
                        </v-card-title>
                
                        <v-card-text class="text-left">
                            <v-list class="transparent">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Place Name
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.placeName }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Users
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.users }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ice Server
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.iceServer }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Domain ID
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.placeID }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Owner Account ID
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.sponsorAccountId }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Protocol
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.protocol }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Version
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            {{ placeDialog.version }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-header disable-icon-rotate>
                                                Public Key
                                                <template v-slot:actions>
                                                    <v-icon color="primary">mdi-information-variant</v-icon>
                                                </template>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                {{ placeDialog.publicKey }}
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        small
                        color="red"
                        v-on:click.stop="deletePlace(item.placeID, item.placeName)"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="!canEditPlace(item.accountID)"
                    >
                        mdi-delete-alert
                    </v-icon>
                </template>
                <span>Delete Place</span>
            </v-tooltip>
        </template>
        <template v-slot:item.images="{ item }">
            <v-avatar>
                <img
                    :src="item.images.thumbnail"
                >
            </v-avatar>
        </template>
        <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template> -->
        <!-- EDIT DIALOGS -->
        <template v-slot:item.placeName="{ item }">
            <v-edit-dialog
                @save="savePlaceName(item.placeName)"
                @cancel=""
                @open="beginEditingDomain(item.placeID)"
                @close=""
                :return-value.sync="item.placeName"
            > {{ item.placeName }}
                <template v-slot:input>
                    <v-text-field
                        v-model="item.placeName"
                        label="Edit"
                        single-line
                        counter
                        :disabled="!$store.state.account.useAsAdmin"
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
    </v-data-table>
</template>

<script>
import { EventBus } from '../plugins/eventBus.js';
var vue_this;
var store;
var metaverseServer;

export default {
    name: 'PlacesList',
    props: {
        source: String
    },
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Place Name',
                align: 'start',
                sortable: true,
                value: 'placeName',
            },
            { text: 'Users', value: 'users' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        placeDialogShow: false,
        placeDialog: {
            placeName: null,
            placeID: null,
            address: null,
            description: null,
            accountID: null,
            thumbnail: null,
            images: null,
            // Place's domain information
            domainID: null,
            domainName: null,
            domainNetworkAddress: null,
            domainIceServer: null,
            domainLastSeen: null,
            domainUsers: null
        },
        // Editing Place
        editingPlace: null,
        // Places List
        places: [],
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
            this.retrievePlacesList(metaverseServer);
        },

        retrievePlacesList: function (metaverseURL) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'GET',
                url: metaverseURL + '/api/v1/places' + parameters,
                contentType: 'application/json',
            })
                .done(function (result) {
                    vue_this.places = [];
                    result.data.places.forEach(function(item, index) {
                        vue_this.places.push(
                            {
                                placeName: item.name,
                                placeID: item.placeId,
                                address: item.address,
                                description: item.description,
                                accountID: item.accountId,
                                thumbnail: item.thumbanil,
                                images: item.images,
                                // Place's domain information
                                domainID: item.domain.id,
                                domainName: item.domain.name,
                                domainNetworkAddress: item.domain.network_address,
                                domainIceServer: item.domain.ice_server_address,
                                domainLastSeen: item.domain.time_of_last_heartbeat,
                                domainUsers: item.domain.num_users,
                            }
                        );
                    });
                })
                .fail(function (result) {
                    console.info('Failed to retrieve places list: ', result);
                })
        },
        
        rowClicked (rowData) {
            this.placeDialogShow = true;
            this.placeDialog.placeName = rowData.placeName;
            this.placeDialog.placeID = rowData.placeID;
            this.placeDialog.address = rowData.address;
            this.placeDialog.description = rowData.description;
            this.placeDialog.accountID = rowData.accountID;
            this.placeDialog.thumbanil = rowData.thumbanil;
            this.placeDialog.images = rowData.images;
            this.placeDialog.domainID = rowData.domainID;
            this.placeDialog.domainName = rowData.domainName;
            this.placeDialog.domainNetworkAddress = rowData.domainNetworkAddress;
            this.placeDialog.domainIceServer = rowData.domainIceServer;
            this.placeDialog.domainLastSeen = rowData.domainLastSeen;
            this.placeDialog.domainUsers = rowData.domainUsers;
        },
        
        canEditPlace: function (placeOwningID) {
            return store.account.useAsAdmin || store.account.accountId === placeOwningID;
        },
        
        // BEGIN Inline Editing Functionality
        beginEditingPlace (placeID) {
            this.editingPlace = placeID;
        },
        
        savePlaceName (newPlaceName) {
            this.postUpdateDomain(this.editingPlace, {
                'name': newPlaceName,
            })
        },
        
        deletePlace (placeID, placeName) {
            confirm('Are you sure you want to delete ' + placeName + '?') && this.postDeleteDomain(placeID);
        },
        // END Inline Editing Functionality
        
        // BEGIN Handling requests to the API
        postUpdatePlace (placeID, dataToUpdate) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'POST',
                url: metaverseServer + 'api/v1/places/' + placeID + parameters,
                contentType: 'application/json',
                data: { 
                    'domain': {
                        dataToUpdate
                    }
                }
            })
                .done(function (result) {
                    console.info('Successfully updated domain:', placeID);
                    vue_this.retrievePlacesList(metaverseServer);
                })
                .fail(function (result) {
                    console.info('Failed to update domain:', placeID);
                    vue_this.retrievePlacesList(metaverseServer);
                })
        },
        
        postDeletePlace (placeID) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'DELETE',
                url: metaverseServer + 'api/v1/domains/' + placeID + parameters,
            })
                .done(function (result) {
                    console.info('Successfully deleted domain:', placeID);
                    vue_this.retrievePlacesList(metaverseServer);
                })
                .fail(function (result) {
                    console.info('Failed to delete domain:', placeID);
                    vue_this.retrievePlacesList(metaverseServer);
                })
        }
        // END Handling requests to the API
    },
}
</script>
