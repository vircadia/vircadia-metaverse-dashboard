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
    <div>
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
                    <v-switch class="mt-5"
                        v-model="showOnlyMineStore"
                        row
                        color="input"
                        label="Show Only Mine"
                    ></v-switch>
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                @click="showAddPlaceDialog()" 
                                color="primary"
                                small
                                fab
                            >
                                <v-icon>
                                    mdi-map-marker-plus
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Create Place</span>
                    </v-tooltip>
                    
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
                                                Description
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ placeDialog.description }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Users
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ placeDialog.domainUsers }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Address
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ placeDialog.address }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-expansion-panels>
                                            <v-expansion-panel>
                                                <v-expansion-panel-header disable-icon-rotate>
                                                    Domain
                                                    <template v-slot:actions>
                                                        <v-icon color="primary">mdi-information-variant</v-icon>
                                                    </template>
                                                </v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-list>
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    Domain ID
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    {{ placeDialog.domainID }}
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    Domain Name
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    {{ placeDialog.domainName }}
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    Domain Network Address
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    {{ placeDialog.domainNetworkAddress }}
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    Domain Ice Server
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    {{ placeDialog.domainID }}
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    Domain Last Checked In
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    {{ placeDialog.domainLastSeen }}
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <!-- End Places Dialog -->
                    <!-- Add Place Dialog -->
                    <v-dialog
                        v-model="addPlaceDialogShow"
                        width="500"
                        color="primary"
                    >
                        <v-card>
                            <v-card-title>
                                Add Place
                            </v-card-title>
                    
                            <v-card-text>
                                <v-form
                                    ref="addPlaceForm"
                                >
                                    <v-text-field
                                        label="Place Name"
                                        name="placeName"
                                        v-model="addPlaceDialog.name"
                                        prepend-icon="mdi-rename-box"
                                        type="text"
                                        :rules="addPlaceDialog.nameRules"
                                        color="input"
                                    ></v-text-field>
                                    <v-textarea
                                        label="Description"
                                        name="description"
                                        v-model="addPlaceDialog.description"
                                        prepend-icon="mdi-image-text"
                                        type="text"
                                        :rules="addPlaceDialog.descriptionRules"
                                        color="input"
                                    ></v-textarea>
                                    <v-text-field
                                        label="Location & Orientation ( /x,y,z/x,y,z,w )"
                                        placeholder="/0,0,0/0,0,0,1"
                                        name="address"
                                        v-model="addPlaceDialog.address"
                                        prepend-icon="mdi-compass-outline"
                                        type="text"
                                        :rules="addPlaceDialog.addressRules"
                                        color="input"
                                    ></v-text-field>
                                    <v-autocomplete
                                        v-model="addPlaceDialog.domainID"
                                        prepend-icon="mdi-earth"
                                        :items="domains"
                                        filled
                                        chips
                                        label="Assign to Domain"
                                        item-text="placeName"
                                        item-value="domainID"
                                        :filter="addPlaceDialogFilter"
                                        :rules="addPlaceDialog.domainIDRules"
                                        color="input"
                                    >
                                        <template v-slot:item="data">
                                            <template>
                                                <v-list-item-content>
                                                    <v-list-item-title 
                                                        v-if="data.item.placeName !== ''" 
                                                        v-html="data.item.placeName"
                                                    ></v-list-item-title>
                                                    <v-list-item-title 
                                                        v-else 
                                                    >
                                                        Unknown
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle 
                                                        v-html="data.item.domainID"
                                                    ></v-list-item-subtitle>
                                                    <v-list-item-subtitle 
                                                        v-html="data.item.created"
                                                    ></v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                        <template v-slot:selection="data">
                                            <v-chip
                                                v-bind="data.attrs"
                                                :input-value="data.selected"
                                            >
                                                <span v-if="data.item.placeName !== ''">{{ data.item.placeName }}</span>
                                                <span v-else>{{ data.item.domainID }}</span>
                                            </v-chip>
                                        </template>
                                    </v-autocomplete>
                                </v-form>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        @click="postAddPlace"
                                        color="primary"
                                    >
                                        Create
                                    </v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <!-- End Add Place Dialog -->
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
            <!-- <template v-slot:item.placeName="{ item }">
                <v-edit-dialog
                    @save="savePlaceName(item.placeName)"
                    @cancel=""
                    @open="beginEditingPlace(item.placeID)"
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
            </template> -->
        </v-data-table>

        <v-snackbar
            v-model="snackbarSuccessShow"
            :timeout="snackbarSuccessTimeout"
            color="success"
        >
            {{ snackbarSuccessText }}
    
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbarSuccessShow = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
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
            { text: 'Users', value: 'domainUsers' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        // Place Dialog
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
        // Place Add Dialog
        addPlaceDialogShow: false,
        addPlaceDialog: {
            name: null,
            nameRules: [
                v => !!v || 'A place name is required.'
            ],
            description: null,
            descriptionRules: [
                v => !!v || 'A description is required.'
            ],
            address: "/0,0,0/0,0,0,0",
            addressRules: [
                v => !!v || 'An address is required.'
            ],
            domainID: null,
            domainIDRules: [
                v => !!v || 'A domain to assign this place to is required.'
            ],
        },
        // Editing Place
        editingPlace: null,
        // Places List
        places: [],
        // Domains List
        domains: [],
        // Success Snackbar
        snackbarSuccessShow: false,
        snackbarSuccessText: 'Success.',
        snackbarSuccessTimeout: 6000
    }),
    
    computed: {
    },

    watch: {
        showOnlyMineStore: {
            handler: function () {
                this.retrievePlacesList(metaverseServer);
            }
        },
    },

    created () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = store.metaverseConfig.server;
        
        this.initialize();
    },
    
    computed: {
        showOnlyMineStore: {
            get () {
                return this.$store.state.places.showOnlyMine;
            },
            set (value) {
                this.$store.commit('mutate', {
                    update: true,
                    property: 'places',
                    with: {
                        showOnlyMine: value
                    }
                });
            }
        }
    },

    methods: {
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },

        initialize () {
            this.retrievePlacesList(metaverseServer);
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
        
        // BEGIN Add Place Dialog
        
        showAddPlaceDialog () {
            this.addPlaceDialogShow = true; 
            this.retrieveDomainList(metaverseServer);
        },
        
        addPlaceDialogFilter (item, queryText) {
            var placeName = item.placeName.toLowerCase();
            var domainID = item.domainID;
            var searchText = queryText.toLowerCase();
            
            return placeName.indexOf(searchText) > -1 ||
                   domainID.indexOf(searchText) > -1
        },
        
        // END Add Place Dialog
        
        canEditPlace: function (placeOwningID) {
            return store.account.useAsAdmin || store.account.accountId === placeOwningID;
        },
        
        // BEGIN Inline Editing Functionality
        beginEditingPlace (placeID) {
            this.editingPlace = placeID;
        },
        
        savePlaceName (newPlaceName) {
            this.postUpdatePlace(this.editingPlace, "name", {
                'set': newPlaceName
            })
        },
        
        deletePlace (placeID, placeName) {
            confirm('Are you sure you want to delete ' + placeName + '?') && this.postDeletePlace(placeID);
        },
        // END Inline Editing Functionality

        // BEGIN Handling requests to the API
        retrievePlacesList: function (metaverseURL) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;

            var apiURL = '/api/v1/places';
            if (this.showOnlyMineStore) {
                apiURL = '/api/v1/user/places';
            }

            window.$.ajax({
                type: 'GET',
                url: metaverseURL + apiURL + parameters,
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

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to retrieve places list.',
                            code: '2',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        },
        
        retrieveDomainList: function (metaverseURL) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;
            window.$.ajax({
                type: 'GET',
                url: metaverseURL + '/api/v1/domains' + parameters,
                contentType: 'application/json',
            })
                .done(function (result) {
                    vue_this.domains = [];
                    result.data.domains.forEach(function(item, index) {
                        vue_this.domains.push(
                            {
                                placeName: item.name,
                                domainID: item.domainId,
                                created: item.when_domain_entry_created
                            }
                        );
                    });
                })
                .fail(function (result) {
                    console.info('Failed to retrieve domain list: ', result);
                })
        },
        
        postAddPlace: function () {
            if (!this.$refs.addPlaceForm.validate()) return;
            this.addPlaceDialogShow = false;

            var objectToPost = {
                'place': {
                    'name': vue_this.addPlaceDialog.name,
                    'description': vue_this.addPlaceDialog.description,
                    'address': vue_this.addPlaceDialog.address,
                    'domainId': vue_this.addPlaceDialog.domainID
                }
            };
            
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'POST',
                url: metaverseServer + '/api/v1/user/places' + parameters,
                contentType: 'application/json',
                data: JSON.stringify(objectToPost)
            })
                .done(function (result) {
                    console.info('Add place successful.');
                    vue_this.snackbarSuccessText = "Successfully created place.";
                    vue_this.snackbarSuccessShow = true;
                    vue_this.$refs.addPlaceForm.reset();
                    vue_this.retrievePlacesList(metaverseServer);
                })
                .fail(function (result) {
                    console.info('Failed to add place:', result);

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to add place ' + vue_this.addPlaceDialog.name,
                            code: '3',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                    vue_this.retrievePlacesList(metaverseServer);
                })
        },
        
        postUpdatePlace (placeID, fieldToUpdate, dataToUpdate) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'POST',
                url: metaverseServer + '/api/v1/places/' + placeID + '/field/' + fieldToUpdate + parameters,
                contentType: 'application/json',
                data: { 
                    dataToUpdate
                }
            })
                .done(function (result) {
                    console.info('Successfully updated place:', placeID);
                    vue_this.snackbarSuccessText = "Successfully updated place.";
                    vue_this.snackbarSuccessShow = true;
                    vue_this.retrievePlacesList(metaverseServer);
                })
                .fail(function (result) {
                    console.info('Failed to update place:', placeID);

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to update place:' + placeID,
                            code: '3',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
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
                url: metaverseServer + '/api/v1/user/places/' + placeID + parameters,
            })
                .done(function (result) {
                    console.info('Successfully deleted place:', placeID);
                    vue_this.snackbarSuccessText = "Successfully deleted place.";
                    vue_this.snackbarSuccessShow = true;
                    vue_this.retrievePlacesList(metaverseServer);
                })
                .fail(function (result) {
                    console.info('Failed to delete place:', placeID);

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to delete place:' + placeID,
                            code: '3',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                    vue_this.retrievePlacesList(metaverseServer);
                })
        }
        // END Handling requests to the API
    },
}
</script>
