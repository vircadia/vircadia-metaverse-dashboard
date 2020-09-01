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
        sort-by="calories"
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
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
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
            <!-- <v-icon
                small
                class="mr-2"
                @click="editUser(item)"
            >
                mdi-pencil
            </v-icon> -->
            <v-icon
                small
                @click="deleteUser(item)"
            >
                mdi-delete
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
                text: 'User',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Account ID', value: 'accountId' },
            { text: 'Connection', value: 'connection' },
            { text: 'Images', value: 'images', sortable: false },
            { text: 'Location', value: 'location' },
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
        retrievePeopleList: function (metaverseURL) {
            window.$.ajax({
                type: 'GET',
                url: metaverseURL + 'api/v1/users',
                contentType: 'application/json',
                data: {
                    asAdmin: true
                }
            })
                .done(function (result) {
                    // vue_this.$store.commit('mutate', {
                    //     property: 'metaverseConfig',
                    //     with: {
                    //         name: result.metaverse_name,
                    //         nickname: result.metaverse_nick_name,
                    //         server: result.metaverse_url,
                    //         iceServer: result.ice_server_url,
                    //         serverVersion: result.metaverse_server_version
                    //     }
                    // });
                    console.info("RESULTS:", result);
                })
                .fail(function (result) {
                    console.info('Failed: ', result);
                    // vue_this.$store.commit('mutate', {
                    //     property: 'error',
                    //     with: {
                    //         title: 'Failed to Retrieve Metaverse Information',
                    //         code: '1',
                    //         full: 'We were unable to retrieve the metaverse information for ' + metaverseURL
                    //     }
                    // });
                    // vue_this.openDialog('ErrorOccurred', true);
                })
        },
        initialize () {
            this.retrievePeopleList(this.$store.state.metaverseConfig.server);

            this.people = [
                {
                    name: 'Kalila',
                    accountId: 421,
                    connection: false,
                    images: {
                        'Hero': '../assets/231352681.png',
                        'Thumbnail': '../assets/231352681.png',
                        'Tiny': '../assets/231352681.png'
                    },
                    location: 421
                },
                {
                    name: 'MrBlue',
                    accountId: 420,
                    connection: true,
                    images: {
                        'Hero': '../assets/231352681.png',
                        'Thumbnail': '../assets/231352681.png',
                        'Tiny': '../assets/231352681.png'
                    },
                    location: 420
                }
            ]
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
