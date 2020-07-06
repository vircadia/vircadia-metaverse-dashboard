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
                                        prepend-icon="mdi-account"
                                        type="text"
                                    ></v-text-field>

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
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
                                <v-btn color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'Login',
    props: {
        source: String
    },
    data: () => ({
        login: {
            metaverseServer: ''
        }
    }),
    created: function () {
        // Bootstrap initial variables, pre-fill them, etc.
        if (this.$store.state.metaverseConfig.server) {
            this.metaverseServer = this.$store.state.metaverseConfig.server;
        }
    }
}
</script>
