<!--
//  App.vue
//
//  Created by Kalila L. on 2 Jul 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-app>
        <v-navigation-drawer
            v-model="mainMenu"
            app
        >
            <v-list v-if="$store.state.account.isLoggedIn">
                <v-list-item-group v-model="mainMenuModel" mandatory>
                    <v-list-item
                        v-for="(route, i) in getRoutes"
                        :key="i"
                        @click.native="$router.push(route.path)"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="route.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="route.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>
        <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" -->
        <v-app-bar
            app
            color="primary"
            src="/assets/1920_bar.png"
        >
            <v-app-bar-nav-icon @click.stop="mainMenu = !mainMenu"></v-app-bar-nav-icon>
            <v-toolbar-title class="mr-4">
                {{ $store.state.metaverseConfig.nickname }}
            </v-toolbar-title>
            <span v-if="$store.state.account.isLoggedIn" class="mr-4">
                Hello, {{ $store.state.account.username }}!
            </span>
            <span v-if="this.$store.state.account.isAdmin" class="mt-5">
                <v-switch
                    v-model="useAsAdminStore"
                    inset
                    row
                    label="Admin View"
                ></v-switch>
            </span>
            <v-spacer></v-spacer>
            <v-btn icon @click="logout">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-app-bar>

        <transition name="fade" mode="out-in">
            <component @hideDialog="dialog.show = false" v-if="dialog.show" v-bind:is="dialog.which"></component>
        </transition>

        <transition name="fade" mode="out-in" hide-on-leave="true">
            <router-view/>
        </transition>

        <v-footer
            color="primary"
            app
        >
            <span class="white--text">Iamus Dashboard v0.0.1b | Vircadia | <a class="white--text" href="https://github.com/vircadia/project-iamus-dashboard/issues">Feedback</a></span>
            <v-spacer></v-spacer>
            <span class="white--text">Metaverse: <b>{{ $store.state.metaverseConfig.server }}</b></span>
            <span v-show="$store.state.metaverseConfig.serverVersion" class="white--text ml-4">Version: {{ $store.state.metaverseConfig.serverVersion["npm-package-version"] }}</span>
        </v-footer>
    </v-app>

</template>

<script>
import { EventBus } from './plugins/eventBus.js';
var vue_this;
var store;
var metaverseServer;

EventBus.$on('open-dialog', data => {
    vue_this.openDialog(data.which, data.shouldShow);
});

import ErrorOccurred from './components/dialogs/ErrorOccurred'

export default {
    name: 'App',
    components: {
        // Dialogs
        ErrorOccurred
    },
    computed: {
        updateAccountSession () {
            return this.$store.state.account;
        },
        updateAccessToken () {
            return this.$store.state.account.accessToken;
        },
        metaverseServerChanged () {
            return this.$store.state.metaverseConfig.server;
        },
        getRoutes () {
            var routes = this.$router.options.routes;

            if (this.$store.state.account.isLoggedIn) {
                routes = this.$router.options.routes.filter(
                    r => r.name !== 'Login'
                );
            } else {
                routes = this.$router.options.routes.filter(
                    r => r.name === 'Login'
                );
            }

            return routes;
        },
        useAsAdminStore: {
            get () {
                return this.$store.state.account.useAsAdmin;
            },
            set (value) {
                this.$store.commit('mutate', {
                    update: true,
                    property: 'account',
                    with: {
                        useAsAdmin: value
                    }
                });
            }
        }
    },
    watch: {
        // Save the state of the session to storage for retrieval if the user leaves and comes back.
        updateAccountSession: {
            handler: function (newVal) {
                for (var item in newVal) {
                    if (newVal[item] !== null) {
                        localStorage.setItem(item, newVal[item]);
                    }
                }
            },
            deep: true
        },
        updateAccessToken: {
            handler: function () {
                console.info('Setting new access token header...');
                window.$.ajaxSetup({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('x-vircadia-error-handle', 'badrequest');
                        xhr.setRequestHeader('Authorization', 'Bearer ' + vue_this.$store.state.account.accessToken);
                    }
                });
            }
        },
        useAsAdminStore: {
            handler: function () {
                location.reload();
            }
        },
        metaverseServerChanged: {
            handler: function (newMetaverseServer) {
                if (newMetaverseServer !== store.account.metaverseServer) {
                    this.logout();
                }
            }
        }
    },
    methods: {
        // Dialog Handling
        openDialog: function (which, shouldShow) {
            // We want to reset the element first.
            this.dialog.which = '';
            this.dialog.show = false;

            this.dialog.which = which;
            this.dialog.show = shouldShow;
        },
        closeDialog: function () {
            this.dialog.which = '';
            this.dialog.show = false;
        },
        // Metaverse Bootstrapping
        retrieveMetaverseConfig: function (metaverseURL) {
            window.$.ajax({
                type: 'GET',
                url: metaverseURL + '/api/metaverse_info'
            })
                .done(function (result) {
                    vue_this.$store.commit('mutate', {
                        property: 'metaverseConfig',
                        with: {
                            name: result.metaverse_name,
                            nickname: result.metaverse_nick_name,
                            server: result.metaverse_url,
                            iceServer: result.ice_server_url,
                            serverVersion: result.metaverse_server_version
                        }
                    });
                })
                .fail(function (result) {
                    console.info('Failed: ', result);
                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to Retrieve Metaverse Information',
                            code: '1',
                            full: 'We were unable to retrieve the metaverse information for ' + metaverseURL
                        }
                    });
                    vue_this.openDialog('ErrorOccurred', true);
                })
        },
        // Account Handling
        logout: function () {
            vue_this.$store.commit('mutate', {
                update: true,
                property: 'account',
                with: {
                    isLoggedIn: false,
                    isAdmin: false,
                    accessToken: null,
                    refreshToken: null
                }
            });
            this.$router.push('Login');
        }
    },
    created: function () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = store.metaverseConfig.server;

        var params = new URLSearchParams(window.location.search);
        if (params.has('metaverse')) {
            this.retrieveMetaverseConfig(params.get('metaverse'));
        } else {
            this.retrieveMetaverseConfig(metaverseServer);
        }
    },
    data: () => ({
        mainMenu: null,
        mainMenuModel: null,
        dialog: {
            show: false,
            which: ''
        }
    })
}
</script>
