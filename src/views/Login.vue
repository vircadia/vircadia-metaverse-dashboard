attemptLogin<!--
//  Login.vue
//
//  Created by Kalila L. on 2 July 2020.
//  Copyright 2020 Vircadia contributors.
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
                                <v-toolbar-title>Metaverse</v-toolbar-title>
                            </v-toolbar>
                            <v-tabs
                                v-model="currentTab"
                                grow
                            >
                                <v-tab>
                                    <v-icon left>mdi-account</v-icon>
                                    Login
                                </v-tab>
                                <v-tab>
                                    <v-icon left>mdi-account-plus</v-icon>
                                    Register
                                </v-tab>
                            </v-tabs>
                            <v-tabs-items
                                v-model="currentTab"
                            >
                                <v-tab-item>
                                    <v-card-text>
                                        <v-form
                                            ref="loginForm"
                                        >
                                            <v-text-field
                                                label="Login"
                                                name="login"
                                                v-model="login"
                                                prepend-icon="mdi-account"
                                                type="text"
                                                :rules="loginRules"
                                            ></v-text-field>

                                            <v-text-field
                                                id="password"
                                                label="Password"
                                                name="password"
                                                v-model="password"
                                                v-on:keyup.enter="attemptLogin"
                                                prepend-icon="mdi-lock"
                                                type="password"
                                                :rules="passwordRules"
                                            ></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="attemptLogin" color="primary">Login</v-btn>
                                    </v-card-actions>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card-text>
                                        <v-form
                                            ref="registrationForm"
                                        >
                                            <v-text-field
                                                label="Username"
                                                name="username"
                                                v-model="username"
                                                prepend-icon="mdi-account"
                                                type="text"
                                                :rules="usernameRules"
                                            ></v-text-field>

                                            <v-text-field
                                                label="Email"
                                                name="email"
                                                v-model="email"
                                                prepend-icon="mdi-email"
                                                type="text"
                                                :rules="emailRules"
                                            ></v-text-field>

                                            <v-text-field
                                                id="password"
                                                label="Password"
                                                name="password"
                                                v-model="password"
                                                prepend-icon="mdi-lock"
                                                type="password"
                                                :rules="passwordRules"
                                            ></v-text-field>

                                            <v-text-field
                                                id="confirmPassword"
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                v-model="confirmPassword"
                                                v-on:keyup.enter="attemptRegister"
                                                prepend-icon="mdi-lock"
                                                type="password"
                                                :rules="confirmPasswordRules"
                                            ></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="attemptRegister" color="primary">Register</v-btn>
                                    </v-card-actions>
                                </v-tab-item>
                            </v-tabs-items>
                            <v-expansion-panels
                                v-model="metaverseServerSettingExpansion"
                            >
                                <v-expansion-panel>
                                    <v-expansion-panel-header disable-icon-rotate>
                                        Advanced
                                        <template v-slot:actions>
                                            <v-icon color="error">mdi-web</v-icon>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-autocomplete
                                            id="metaverseServer"
                                            label="Metaverse Server"
                                            name="metaverseServerSetting"
                                            v-model="metaverseServerSetting"
                                            :items="defaultMetaverseServer"
                                            prepend-icon="mdi-web"
                                            append-icon="mdi-content-save-outline"
                                            @click:append="metaverseServerStore = metaverseServerSetting; metaverseServerSettingExpansion = null"
                                            type="text"
                                        ></v-autocomplete>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
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
        loginRules: [
            v => !!v || 'A login is required.'
        ],
        // The password is shared by the login and register box for now for convenience.
        password: '',
        passwordRules: [
            v => !!v || 'A password is required.'
        ],
        // BEGIN REGISTER BOX
        username: '',
        usernameRules: [
            v => !!v || 'A username is required.'
        ],
        email: '',
        emailRules: [
            v => !!v || 'An email is required.'
        ],
        confirmPassword: '',
        confirmPasswordRules: [
            v => !!v || 'You must confirm your password.',
            function (v) {
                return v === vue_this.password || 'Your password must match.'
            }
        ],
        // END REGISTER BOX
        currentTab: null,
        metaverseServerSettingExpansion: false,
        metaverseServerSetting: null,
        defaultMetaverseServer: ['https://metaverse.vircadia.com/live']
    }),
    computed: {
        metaverseServerStore: {
            get () {
                return this.$store.state.metaverseConfig.server;
            },
            set (value) {
                this.$store.commit('mutate', {
                    update: true,
                    property: 'metaverseConfig',
                    with: {
                        server: value
                    }
                });
            }
        }
    },
    methods: {
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },
        attemptLogin: function () {
            if (!this.$refs.loginForm.validate()) return;

            window.$.ajax({
                type: 'POST',
                url: vue_this.$store.state.metaverseConfig.server + '/oauth/token',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                data: {
                    grant_type: 'password',
                    scope: 'owner', // as opposed to 'domain', we're asking for a user token
                    username: vue_this.login,
                    password: vue_this.password
                }
            })
                .done(function (result) {
                    var checkIsAdmin = result.account_roles.includes('admin');

                    vue_this.$store.commit('mutate', {
                        update: true,
                        property: 'account',
                        with: {
                            isLoggedIn: true,
                            isAdmin: checkIsAdmin,
                            username: vue_this.login,
                            accountRoles: result.account_roles,
                            accountId: result.account_id,
                            metaverseServer: vue_this.$store.state.metaverseConfig.server,
                            accessToken: result.access_token,
                            refreshToken: result.refresh_token,
                            tokenType: result.token_type,
                            createdAt: result.created_at,
                            expiresIn: result.expires_in,
                            scope: result.scope
                        }
                    });

                    console.info('Login successful, routing to home.');
                    vue_this.$router.push({ name: 'Home' });
                })
                .fail(function (result) {
                    console.info('Failed to login:', result);
                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to log in to ' + vue_this.$store.state.metaverseConfig.server,
                            code: '2',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        },
        attemptRegister: function () {
            if (!this.$refs.registrationForm.validate()) return;

            var objectToPost = {
                'user': {
                    'username': vue_this.username,
                    'password': vue_this.confirmPassword,
                    'email': vue_this.email
                }
            };

            window.$.ajax({
                type: 'POST',
                url: vue_this.$store.state.metaverseConfig.server + '/api/v1/users',
                contentType: 'application/json',
                data: JSON.stringify(objectToPost)
            })
                .done(function (result) {
                    console.info('Registration successful.');
                    vue_this.$refs.registrationForm.reset();
                    vue_this.currentTab = 0; // Login is 0, Register is 1, and so on... if we add tabs.

                    if (result.data.accountWaitingVerification === true) {
                        vue_this.$store.commit('mutate', {
                            property: 'dialog',
                            with: {
                                notice: {
                                    title: 'Complete Registration',
                                    message: 'Please check your email inbox (and spam!) for an email verification link to complete your registration.'
                                }
                            },
                            update: true
                        });

                        vue_this.sendEvent('open-dialog', { which: 'Notice', shouldShow: true });
                    }
                })
                .fail(function (result) {
                    console.info('Failed to register:', result);
                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to register for ' + vue_this.$store.state.metaverseConfig.server,
                            code: '2',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        }
    },
    created: function () {
        vue_this = this;

        this.metaverseServerSetting = this.metaverseServerStore;
    }
}
</script>
