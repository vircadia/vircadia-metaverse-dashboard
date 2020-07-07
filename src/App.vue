<template>
    <v-app>
        <v-navigation-drawer
            v-model="mainMenu"
            app
        >
            <v-list v-if="$store.state.account.isLoggedIn">
                <v-list-item link @click.native="this.$router.push('/')">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click.native="this.$router.push('/Users')">
                    <v-list-item-action>
                        <v-icon>mdi-user</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item link @click.native="this.$router.push('/Login')">
                    <v-list-item-action>
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
        >
            <v-app-bar-nav-icon @click.stop="mainMenu = !mainMenu"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ $store.state.metaverseConfig.nickname }}</v-toolbar-title>
        </v-app-bar>

        <transition name="fade" mode="out-in">
            <component @hideDialog="dialog.show = false" v-if="dialog.show" v-bind:is="dialog.which"></component>
        </transition>

        <router-view/>

        <v-footer
            color="primary"
            app
        >
            <span class="white--text">Apollo Dashboard v0.0.1a - Vircadia Metaverse Services</span>
            <v-spacer></v-spacer>
            <span class="white--text">Metaverse Server: <b>{{ $store.state.metaverseConfig.server }}</b></span>
            <span v-show="$store.state.metaverseConfig.serverVersion" class="white--text ml-4">Version: {{ $store.state.metaverseConfig.serverVersion }}</span>
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

        if (metaverseServer) {
            this.retrieveMetaverseConfig(metaverseServer);
        }
    },
    data: () => ({
        mainMenu: null,
        dialog: {
            show: false,
            which: ''
        }
    })
}
</script>
