<!--
//  ProfileComponent.vue
//
//  Created by Kalila L. on 17 Sep 2020.
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
    <v-form
        ref="profileForm"
    >
        <v-text-field
            label="Username"
            name="username"
            v-model="username"
            prepend-icon="mdi-rename-box"
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
            label="Account Settings"
            name="account_settings"
            v-model="account_settings"
            prepend-icon="mdi-account"
            type="text"
            :rules="account_settingsRules"
        ></v-text-field>
        
        <v-text-field
            label="Hero Image"
            name="images_hero"
            v-model="images_hero"
            prepend-icon="mdi-image-size-select-actual"
            type="text"
        ></v-text-field>

        <v-text-field
            label="Tiny Image"
            name="images_tiny"
            v-model="images_tiny"
            prepend-icon="mdi-image-size-select-large"
            type="text"
        ></v-text-field>
        
        <v-text-field
            label="Thumbnail Image"
            name="images_thumbnail"
            v-model="images_thumbnail"
            prepend-icon="mdi-image-size-select-small"
            type="text"
        ></v-text-field>
        
        <v-text-field
            label="Public Key"
            name="public_key"
            v-model="public_key"
            prepend-icon="mdi-account-key"
            type="text"
            :rules="public_keyRules"
        ></v-text-field>

        <!-- <v-text-field
            label="Password"
            name="password"
            v-model="password"
            prepend-icon="mdi-lock"
            type="password"
            :rules="passwordRules"
        ></v-text-field> -->

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                    Details
                    <template v-slot:actions>
                        <v-icon color="error">mdi-information-variant</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    {{ accountId }}
                    {{ roles }}
                    {{ when_account_created }}
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-form>
</template>

<script>
var vue_this;

export default {
    name: 'ProfileComponent',
    props: {
        source: String
    },
    data: () => ({
        username: '',
        usernameRules: [
            v => !!v || 'A username is required.'
        ],
        // password: '',
        // passwordRules: [
        //     v => !!v || 'A password is required.'
        // ],
        // confirmPassword: '',
        // confirmPasswordRules: [
        //     v => !!v || 'You must confirm your password.',
        //     function (v) {
        //         return v === vue_this.password || 'Your password must match.'
        //     }
        // ],
        email: '',
        emailRules: [
            v => !!v || 'An email is required.'
        ],
        account_settings: '',
        account_settingsRules: [
            v => !!v || 'Account settings are required.'
        ],
        images_hero: '',
        images_tiny: '',
        images_thumbnail: '',
        // availability: '',
        // availabilityRules: [
        //     v => !!v || 'Availability is required.'
        // ],
        public_key: '',
        public_keyRules: [
            v => !!v || 'A public key is required.'
        ],
        // These are not meant to be changed, but rather displayed.
        accountId: '',
        roles: '',
        when_account_created: '',
        // Misc.
        metaverseServer: ''
    }),
    methods: {
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
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
