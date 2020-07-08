<!--
//  Login.vue
//
//  Created by Kalila L. on 2 July 2020.
//  Copyright 2020 Vircadia and contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                color="primary"
                                dark
                                flat
                            >
                                <v-toolbar-title>Login</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Login"
                                        name="login"
                                        v-model="login"
                                        prepend-icon="mdi-account"
                                        type="text"
                                    ></v-text-field>

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        v-model="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                    ></v-text-field>
                                    <v-expansion-panels v-if="false">
                                        <v-expansion-panel>
                                            <v-expansion-panel-header disable-icon-rotate>
                                                Advanced
                                                <template v-slot:actions>
                                                    <v-icon color="error">mdi-web</v-icon>
                                                </template>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <v-text-field
                                                    id="metaverseServer"
                                                    label="Metaverse Server"
                                                    name="metaverseServer"
                                                    v-model="metaverseServer"
                                                    prepend-icon="mdi-web"
                                                    type="text"
                                                ></v-text-field>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="sendLogin" color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { EventBus } from '../plugins/eventBus.js';
var vue_this;

export default {
    name: 'Login',
    props: {
        source: String
    },
    data: () => ({
        login: '',
        password: '',
        metaverseServer: ''
    }),
    methods: {
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },
        sendLogin: function () {
            window.$.ajax({
                type: 'POST',
                url: vue_this.metaverseServer + '/oauth/token',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                data: {
                    grant_type: 'password',
                    scope: 'owner', // as opposed to 'domain', we're asking for a user token
                    username: vue_this.login,
                    password: vue_this.password
                }
            })
                .done(function (result) {
                    vue_this.$store.commit('mutate', {
                        update: true,
                        property: 'account',
                        with: {
                            isLoggedIn: true,
                            username: vue_this.login,
                            accessToken: result.access_token,
                            tokenType: result.token_type,
                            createdAt: result.created_at,
                            expiresIn: result.expires_in,
                            refreshToken: result.refresh_token,
                            scope: result.scope
                        }
                    });
                    console.info('Login successful, routing to home.');
                    vue_this.$router.push('/Home');
                })
                .fail(function (result) {
                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to Login',
                            code: '2',
                            full: 'We were unable to log you in to ' + vue_this.metaverseServer
                        }
                    });
                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        }
    },
    created: function () {
        vue_this = this;

        // Bootstrap initial variables, pre-fill them, etc.
        if (this.$store.state.metaverseConfig.server) {
            this.metaverseServer = this.$store.state.metaverseConfig.server;
        }
    }
}
</script>
