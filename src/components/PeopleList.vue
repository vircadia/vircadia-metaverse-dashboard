<!--
//  PeopleList.vue
//
//  Created by Kalila L. on 9 Jul 2020.
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
        :items="people"
        :search="search"
        sort-by="user"
        class="elevation-1"
        @click:row="rowClicked"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>People</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-toolbar-title>Users</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    solo
                    label="Search"
                    class="mt-7"
                    clearable
                ></v-text-field>
                <!-- USER DATA DIALOG -->
                <v-dialog
                    v-model="userDialogShow"
                    width="500"
                    color="primary"
                >
                    <v-card>
                        <v-card-title>
                            <v-avatar
                                v-show="userDialog.thumbnail"
                                class="mr-5"
                            >
                                <img :src="userDialog.thumbnail">
                            </v-avatar>
                            {{ userDialog.username }}
                            <v-spacer></v-spacer>
                            <v-tooltip left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="toggleUserEditMode" 
                                        color="primary"
                                        small
                                        fab
                                        :disabled="!canEditUser(userDialog.accountID)"
                                    >
                                        <v-icon v-text="!userEditMode ? 'mdi-account-edit' : 'mdi-image-text'"></v-icon>
                                    </v-btn>
                                </template>
                                <span v-text="!userEditMode ? 'Edit' : 'View'"></span>
                            </v-tooltip>
                        </v-card-title>

                        <v-scroll-x-transition 
                            :hide-on-leave="true"
                        >
                            <v-card-text v-show="!userEditMode" class="text-left">
                                <v-list class="transparent">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Account ID
                                            </v-list-item-title>

                                            <v-list-item-subtitle>
                                                {{ userDialog.accountID }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Status
                                            </v-list-item-title>

                                            <v-list-item-subtitle>
                                                {{ userDialog.status }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-expansion-panels>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Location</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-list class="transparent">
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <!-- <v-list-item-title>
                                                            Domain ID
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="text-right">
                                                            {{ userDialog.location.root.domain.id }}
                                                        </v-list-item-subtitle>
                                                        <v-list-item-subtitle class="text-right">
                                                            {{ userDialog.location.root.domain.name }}
                                                        </v-list-item-subtitle> -->
                                                        <v-list-item-title>
                                                            Session ID
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle>
                                                            {{ userDialog.location_node_id }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <!-- <v-list-item>
                                                    <v-list-item-title>
                                                        Path
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle class="text-right">
                                                        {{ userDialog.location.path }}
                                                    </v-list-item-subtitle>
                                                </v-list-item> -->
                                            </v-list>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-card-text>
                        </v-scroll-x-transition>
                        <v-scroll-x-reverse-transition
                            :hide-on-leave="true"
                        >
                            <v-card-text v-show="userEditMode" class="text-left">
                                <v-form
                                    ref="editUser.password"
                                >
                                    <v-text-field
                                        label="Password"
                                        name="editUser.password"
                                        v-model="editUser.password"
                                        prepend-icon="mdi-rename-box"
                                        append-icon="mdi-content-save-outline"
                                        @click:append="postUpdateAccount(userDialog.accountID, 'password', editUser.password)"
                                        type="password"
                                        :rules="editUser.passwordRules"
                                        :loading="editUser.passwordLoading"
                                        color="input"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                        </v-scroll-x-reverse-transition>
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
                        v-on:click.stop="deleteUser(item.accountID, item.username)"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="!canEditUser"
                    >
                        mdi-delete-alert
                    </v-icon>
                </template>
                <span>Delete User</span>
            </v-tooltip>
        </template>
        <template v-slot:item.thumbnail="{ item }">
            <v-avatar>
                <img
                    v-show="item.thumbnail"
                    :src="item.thumbnail"
                >
            </v-avatar>
        </template>
        <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template> -->
        <!-- EDIT DIALOGS -->
        <!-- <template v-slot:item.username="{ item }">
            <v-edit-dialog
                @save="saveUsername(item.username)"
                @cancel=""
                @open="beginEditingUsername(item.accountID)"
                @close=""
                :return-value.sync="item.username"
            > {{ item.username }}
                <template v-slot:input>
                    <v-text-field
                        v-model="item.username"
                        label="Edit"
                        single-line
                        counter
                        :disabled="!$store.state.account.useAsAdmin"
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template> -->
    </v-data-table>
</template>

<script>
var vue_this;
var store;
var metaverseServer;

export default {
    name: 'PeopleList',
    props: {
        source: String
    },
    data: () => ({
        dialog: false,
        headers: [
            { text: 'Thumbnail', value: 'thumbnail' },
            {
                text: 'Username',
                align: 'start',
                sortable: true,
                value: 'username',
            },
            { text: 'Account ID', value: 'accountID' },
            // { text: 'Connection', value: 'connection' },
            // { text: 'Images', value: 'images', sortable: false },
            { text: 'Status', value: 'status' },
            // { text: 'Online', value: 'online' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        search: null,
        // User Dialog
        userDialogShow: false,
        userDialog: {
            thumbnail: '',
            username: '',
            accountID: '',
            status: '',
            location_node_id: ''
        },
        // User Dialog -> Edit Mode
        userEditMode: false,
        editUser: {
            password: '',
            passwordRules: [
                v => !!v || 'A password is required.'
            ],
            passwordLoading: false
        },
        // Editing User
        editingUser: null,
        // User List
        people: []
    }),
    
    computed: {
    },

    watch: {
    },

    created () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = this.$store.state.metaverseConfig.server;
        
        this.initialize();
    },

    methods: {
        initialize () {
            this.retrieveAccountList(this.$store.state.metaverseConfig.server);
        },

        rowClicked (rowData) {
            this.userEditMode = false;
            this.userDialogShow = true;
            this.userDialog.thumbnail = rowData.thumbnail;
            this.userDialog.username = rowData.username;
            this.userDialog.accountID = rowData.accountID;
            this.userDialog.status = rowData.status;
            this.userDialog.location_node_id = rowData.locationData.node_id;
        },
        
        canEditUser: function () {
            return store.account.useAsAdmin;
        },
        
        toggleUserEditMode () {
            this.userEditMode = !this.userEditMode;
            
            if (this.placeEditMode === true) {
                this.editUser.password = '';
            }
        },

        // BEGIN Inline Editing Functionality
        beginEditingUsername (userID) {
            this.editingUser = userID;
        },

        // saveUsername (newUsername) {
        //     this.postUpdateAccount(this.editingUser, {
        //         'username': newUsername,
        //     })
        // },

        deleteUser (userID, username) {
            confirm('Are you sure you want to delete ' + username + '?') && this.postDeleteAccount(userID);
        },
        // END Inline Editing Functionality

        // BEGIN Handling requests to the API

        retrieveAccountList: function (metaverseURL) {
            var parameters = window.$.param({
                "asAdmin": vue_this.$store.state.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'GET',
                url: metaverseURL + '/api/v1/users' + parameters
            })
                .done(function (result) {
                    vue_this.people = [];
                    result.data.users.forEach(function(item, index) {
                        var isOnline = item.location.online ? 'Online' : 'Offline';
                        vue_this.people.push(
                            {
                                username: item.username,
                                status: isOnline,
                                locationData: item.location,
                                accountID: item.accountId,
                                thumbnail: item.images.thumbnail ? item.images.thumbnail : ''
                            }
                        );
                    });
                })
                .fail(function (result) {
                    console.info('Failed to retrieve account list: ', result);
                })
        },

        // THESE REQUESTS USE THE ACCOUNT API WHILE THE LIST IS USING THE USERS API
        postUpdateAccount (userID, fieldToUpdate, dataToUpdate) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;
            
            var objectToPost = {
                'set': dataToUpdate
            };

            this.editUser[fieldToUpdate + 'Loading'] = true;
            window.$.ajax({
                type: 'POST',
                url: metaverseServer + '/api/v1/account/' + userID + '/field/' + fieldToUpdate + parameters,
                contentType: 'application/json',
                data: JSON.stringify(objectToPost)
            })
                .done(function (result) {
                    console.info('Successfully updated account:', userID);
                    vue_this.editUser[fieldToUpdate + 'Loading'] = false;
                    vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server);
                })
                .fail(function (result) {
                    console.info('Failed to update account:', userID);
                    vue_this.editUser[fieldToUpdate + 'Loading'] = false;
                    vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server);
                })
        },
        
        postDeleteAccount (userID) {
            var parameters = window.$.param({
                "asAdmin": vue_this.$store.state.account.useAsAdmin
            });
            parameters = "?" + parameters;

            window.$.ajax({
                type: 'DELETE',
                url: vue_this.$store.state.metaverseConfig.server + '/api/v1/account/' + userID + parameters,
            })
                .done(function (result) {
                    console.info('Successfully deleted account:', userID);
                    vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server);
                })
                .fail(function (result) {
                    console.info('Failed to delete account:', userID);
                    vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server);
                })
        }
        // END Handling requests to the API
    },
}
</script>
