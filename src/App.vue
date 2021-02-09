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
            <v-list-item
                href="https://vircadia.com/"
            >
                <v-list-item-icon>
                    <v-avatar>
                        <img
                            src="/assets/vircadia-icon-256.png"
                        >
                    </v-avatar>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Vircadia Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-item-group v-model="computedMenuModel">
                    <v-list-item
                        v-for="(route) in getRoutes"
                        :key="route.name"
                        :value="route.name"
                        @click.native="$router.push({ name: route.name })"
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

            <v-divider class="mb-5"></v-divider>

            <v-slider
                v-model="dashboardConfigStore.dashboardTheme"
                :tick-labels="themeOptions"
                :max="2"
                step="1"
                ticks="always"
                tick-size="3"
                class="px-5"
            ></v-slider>
        </v-navigation-drawer>

        <v-app-bar
            v-show="showAppBar"
            app
            color="primary"
            src="/assets/1920_bar.png"
            class="white--text"
        >
            <v-app-bar-nav-icon
                color="white"
                @click.stop="mainMenu = !mainMenu"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="mr-4">
                {{ $store.state.metaverseConfig.nickname }}
            </v-toolbar-title>
            <span v-if="$store.state.account.isLoggedIn" class="mr-4">
                Hello, {{ $store.state.account.username }}!
            </span>
            <span v-if="$store.state.account.isAdmin" class="mt-5 white--text">
                <v-switch
                    v-model="useAsAdminStore"
                    row
                    color="input"
                    label="Admin View"
                >
                    <template v-slot:label>
                        <span class="white--text">Admin View</span>
                    </template>
                </v-switch>
            </span>
            <v-spacer></v-spacer>
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        fab
                        small
                        @click="logout"
                        v-bind="attrs"
                        v-on="on"
                        v-show="isLoggedIn"
                        color="input"
                        class="info"
                    >
                        <v-icon>mdi-export</v-icon>
                    </v-btn>
                </template>
                <span>Logout</span>
            </v-tooltip>
        </v-app-bar>

        <transition name="fade" mode="out-in">
            <component @close-dialog="closeDialog" v-if="dialog.show" v-bind:is="dialog.which"></component>
        </transition>

        <transition name="fade" mode="out-in" hide-on-leave="true">
            <router-view/>
        </transition>

        <v-footer
            v-show="showFooter"
            color="vircadiaNavy"
            app
        >
            <span class="white--text">Iamus Dashboard {{ $store.state.globalConsts.DASHBOARD_VERSION }} | Vircadia | <a class="white--text" href="https://github.com/vircadia/project-iamus-dashboard/issues">Feedback</a></span>
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
        updatePlacesSettings () {
            return this.$store.state.places;
        },
        updateAccessToken () {
            return this.$store.state.account.accessToken;
        },
        metaverseServerChanged () {
            return this.$store.state.metaverseConfig.server;
        },
        getRoutes () {
            var routes = this.$router.options.routes;

            routes = routes.filter(
                r => r.meta.showOnMenu === true
            );

            if (this.$store.state.account.isLoggedIn) {
                routes = routes.filter(
                    r => r.name !== 'Login'
                );
            } else {
                routes = routes.filter(
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
        },
        dashboardConfigStore: {
            get () {
                return this.$store.state.dashboardConfig;
            },
            set (value) {
                this.$store.commit('mutate', {
                    update: true,
                    property: 'dashboardConfig',
                    with: value
                });
            }
        },
        getDashboardTheme () {
            return this.$store.state.dashboardConfig.dashboardTheme;
        },
        isLoggedIn () {
            return this.$store.state.account.isLoggedIn;
        },
        computedMenuModel: {
            get () {
                return this.$route.name;
            },
            set () {
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
        // Save the settings for places.
        updatePlacesSettings: {
            handler: function (newVal) {
                for (var item in newVal) {
                    if (newVal[item] !== null) {
                        localStorage.setItem(item, newVal[item]);
                    }
                }
            },
            deep: true
        },
        // Save the settings for the dashboard.
        dashboardConfigStore: {
            handler: function (newVal) {
                for (var item in newVal) {
                    if (newVal[item] !== null) {
                        localStorage.setItem(item, newVal[item]);
                    }
                }
            },
            deep: true
        },
        getDashboardTheme: {
            handler: function () {
                this.setDashboardTheme();
            }
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
                localStorage.setItem('metaverseConfig.server', newMetaverseServer);

                this.retrieveMetaverseConfig(newMetaverseServer);

                if (this.isLoggedIn && newMetaverseServer !== store.account.metaverseServer) {
                    this.logout();
                }
            }
        },
        isLoggedIn: {
            handler: function (newValue) {
                if (newValue === true && store.router.awaitingRouteOnLogin) {
                    this.$router.push(store.router.routeOnLogin);
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
        setDashboardTheme: function () {
            if (this.getDashboardTheme === 0) {
                this.$vuetify.theme.dark = false;
            } else if (this.getDashboardTheme === 1) {
                this.$vuetify.theme.dark = true;
            } else if (this.getDashboardTheme === 2) {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.$vuetify.theme.dark = true;
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    this.$vuetify.theme.dark = false;
                }
            }
        },
        // Metaverse Bootstrapping
        retrieveMetaverseConfig: function (metaverseURL) {
            console.info('Bootstrapping metaverse config for', metaverseURL);
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
        }
    },
    created: function () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = store.metaverseConfig.server;

        this.setDashboardTheme();

        var params = new URLSearchParams(window.location.search);

        if (params.has('metaverse')) {
            this.retrieveMetaverseConfig(params.get('metaverse'));
        } else {
            this.retrieveMetaverseConfig(metaverseServer);
        }

        if (this.isLoggedIn && metaverseServer !== store.account.metaverseServer) {
            this.logout();
        }

        if (params.get('appMode') === 'true') {
            this.showAppBar = false;
            this.showFooter = false;
            this.mainMenu = false;
        }
    },
    data: () => ({
        mainMenu: null,
        showAppBar: true,
        showFooter: true,
        themeOptions: [
            'Light', // 0
            'Dark', // 1
            'Auto' // 2
        ],
        dialog: {
            show: false,
            which: ''
        }
    })
}
</script>
