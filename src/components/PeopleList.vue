<!--
//  PeopleList.vue
//
//  Created by Kalila L. on 9 Jul 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-data-table
        :headers="usingAsAdmin ? adminHeaders : headers"
        :items="people"
        :loading="peopleDataTableLoading"
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
                    v-model="userDialog.show"
                    width="500"
                    color="primary"
                >
                    <UserProfileComponent :userToLoad="userDialog.username"></UserProfileComponent>
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
                        :disabled="!usingAsAdmin"
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
import { EventBus } from '../plugins/eventBus.js';
import UserProfileComponent from './UserProfileComponent'

var vue_this;
var store;
var metaverseServer;

export default {
    name: 'PeopleList',
    props: {
        source: String
    },
    components: {
        UserProfileComponent
    },
    data: () => ({
        dialog: false,
        headers: [
            { text: 'Thumbnail', value: 'thumbnail' },
            {
                text: 'Username',
                align: 'start',
                sortable: true,
                value: 'username'
            },
            { text: 'Account ID', value: 'accountID' },
            // { text: 'Connection', value: 'connection' },
            // { text: 'Images', value: 'images', sortable: false },
            { text: 'Status', value: 'status' },
            // { text: 'Online', value: 'online' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        adminHeaders: [
            { text: 'Thumbnail', value: 'thumbnail' },
            {
                text: 'Username',
                align: 'start',
                sortable: true,
                value: 'username'
            },
            { text: 'Email', value: 'email' },
            { text: 'Account ID', value: 'accountID' },
            // { text: 'Connection', value: 'connection' },
            // { text: 'Images', value: 'images', sortable: false },
            { text: 'Status', value: 'status' },
            // { text: 'Online', value: 'online' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        search: null,
        peopleDataTableLoading: false,
        // User Dialog
        userDialog: {
            show: false,
            username: ''
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
        usingAsAdmin: function () {
            return store.account.useAsAdmin;
        }
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
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },

        initialize () {
            this.retrieveAccountList(this.$store.state.metaverseConfig.server);
        },

        rowClicked (rowData) {
            this.userEditMode = false;
            this.userDialog.show = true;
            this.userDialog.username = rowData.username;
        },

        toggleUserEditMode () {
            this.userEditMode = !this.userEditMode;

            if (this.placeEditMode === true) {
                this.$refs.editUserPassword.reset();
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

        pushToPeopleList (accounts) {
            accounts.forEach(function (item, index) {
                var isOnline = item.location.online ? 'Online' : 'Offline';
                vue_this.people.push(
                    {
                        username: item.username,
                        email: item.email,
                        status: isOnline,
                        locationData: item.location,
                        accountID: item.accountId,
                        thumbnail: item.images.thumbnail ? item.images.thumbnail : '',
                        hero: item.images.hero ? item.images.hero : '../assets/1920_bar.png'
                    }
                );
            });
        },

        // BEGIN Handling requests to the API
        retrieveAccountList: function (metaverseURL, page) {
            if (!page) {
                page = 1;
            }

            var parameters = window.$.param({
                'page': page,
                'asAdmin': vue_this.$store.state.account.useAsAdmin
            });
            parameters = '?' + parameters;

            console.info('params', parameters);
            console.info('page', page);

            this.peopleDataTableLoading = true;

            window.$.ajax({
                type: 'GET',
                url: metaverseURL + '/api/v1/accounts' + parameters
            })
                .done(function (result) {
                    console.info(result);
                    console.info('page found in func', page);

                    if (page === 1) {
                        vue_this.people = [];
                    }

                    vue_this.pushToPeopleList(result.data.accounts);
                    vue_this.peopleDataTableLoading = false;

                    if (result.total_entries > vue_this.people.length) {
                        vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server, page + 1);
                    }
                })
                .fail(function (result) {
                    vue_this.peopleDataTableLoading = false;

                    console.info('Failed to retrieve people list: ', result);

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to retrieve people list.',
                            code: '2',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        },

        postUpdateAccount (userID, fieldToUpdate, dataToUpdate) {
            var parameters = window.$.param({
                'asAdmin': store.account.useAsAdmin
            });
            parameters = '?' + parameters;

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
                    if (vue_this.userEditMode === true) {
                        vue_this.toggleUserEditMode();
                    }
                    vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server);
                })
                .fail(function (result) {
                    console.info('Failed to update account:', userID);
                    vue_this.editUser[fieldToUpdate + 'Loading'] = false;
                    if (vue_this.userEditMode === true) {
                        vue_this.toggleUserEditMode();
                    }
                    vue_this.retrieveAccountList(vue_this.$store.state.metaverseConfig.server);
                })
        },

        postDeleteAccount (userID) {
            var parameters = window.$.param({
                'asAdmin': vue_this.$store.state.account.useAsAdmin
            });
            parameters = '?' + parameters;

            window.$.ajax({
                type: 'DELETE',
                url: vue_this.$store.state.metaverseConfig.server + '/api/v1/account/' + userID + parameters
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
    }
}
</script>
