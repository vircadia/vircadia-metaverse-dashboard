<!--
//  PeopleList.vue
//
//  Created by Kalila L. on 9 Jul 2020.
//  Copyright 2020 Vircadia and contributors.
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
        sort-by="user"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>People</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-toolbar-title>Accounts</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                            :disabled="true"
                        >
                            New User
                        </v-btn>
                    </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedUser.name" label="Username"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedUser.accountId" label="Account ID"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-checkbox v-model="editedUser.connection" label="Connection"></v-checkbox>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedUser.images" label="Images"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="editedUser.location" label="Location"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editUser(item)"
                :disabled="true"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteUser(item)"
                :disabled="true"
            >
                mdi-nuke
            </v-icon>
        </template>
        <template v-slot:item.images="{ item }">
            <v-avatar>
                <img
                    :src="item.images.Thumbnail"
                >
            </v-avatar>
        </template>
        <!-- <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template> -->
    </v-data-table>
</template>

<script>
var vue_this;

export default {
    name: 'PeopleList',
    props: {
        source: String
    },
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Username',
                align: 'start',
                sortable: true,
                value: 'username',
            },
            { text: 'Account ID', value: 'accountId' },
            // { text: 'Connection', value: 'connection' },
            // { text: 'Images', value: 'images', sortable: false },
            { text: 'Location', value: 'location' },
            // { text: 'Online', value: 'online' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        people: [],
        editedIndex: -1,
        editedUser: {
            name: '',
            accountId: 0,
            connection: null,
            images: {
                'Hero': '',
                'Thumbnail': '',
                'Tiny': ''
            },
            location: 'Unknown'
        },
        defaultUser: {
            name: '',
            accountId: 0,
            connection: null,
            images: {
                'Hero': '${publicPath}assets/231352681.png',
                'Thumbnail': '${publicPath}assets/231352681.png',
                'Tiny': '${publicPath}assets/231352681.png'
            },
            location: 'Unknown'
        }
    }),
    
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New User' : 'Edit User'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
    },

    created () {
        vue_this = this;
        
        this.initialize()
    },

    methods: {
        retrieveAccountList: function (metaverseURL) {
            window.$.ajax({
                type: 'GET',
                url: metaverseURL + 'api/v1/users',
                contentType: 'application/json',
                data: {
                    asAdmin: vue_this.$store.state.account.useAsAdmin
                }
            })
                .done(function (result) {
                    result.data.users.forEach(function(item, index) {
                        var isOnline = item.location.online ? 'Online' : 'Offline';
                        vue_this.people.push(
                            {
                                username: item.username,
                                location: isOnline,
                                locationData: item.location,
                                accountId: item.accountId
                            }
                        );
                    });
                })
                .fail(function (result) {
                    console.info('Failed to retrieve account list: ', result);
                })
        },
        initialize () {
            this.retrieveAccountList(this.$store.state.metaverseConfig.server);
        },

        // editUser (item) {
        //     this.editedIndex = this.people.indexOf(item)
        //     this.editedUser = Object.assign({}, item)
        //     this.dialog = true
        // },

        deleteUser (item) {
            const index = this.people.indexOf(item)
            confirm('Are you sure you want to delete this user?') && this.people.splice(index, 1)
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedUser = Object.assign({}, this.defaultUser)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.people[this.editedIndex], this.editedUser)
            } else {
                this.people.push(this.editedUser)
            }
            this.close()
        },
    },
}
</script>
