<!--
//  MyProfileComponent.vue
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
    <v-form>
        <div 
            class="subtitle-1 mb-10"
        >
            You can make changes to your account by changing the fields below. Press the save icon on the right of a field to save it.
        </div>
        <v-form
            ref="username"
            @submit.prevent="postUpdateAccount('username', username)"
        >
            <v-text-field
                label="Username"
                name="username"
                v-model="username"
                prepend-icon="mdi-rename-box"
                append-icon="mdi-content-save-outline"
                @click:append="postUpdateAccount('username', username)"
                type="text"
                :rules="usernameRules"
                :loading="usernameLoading"
                color="input"
            ></v-text-field>
        </v-form>
        
        <v-form
            ref="email"
            @submit.prevent="postUpdateAccount('email', email)"
        >
            <v-text-field
                label="Email"
                name="email"
                v-model="email"
                prepend-icon="mdi-email"
                append-icon="mdi-content-save-outline"
                @click:append="postUpdateAccount('email', email)"
                type="text"
                :rules="emailRules"
                :loading="emailLoading"
                color="input"
            ></v-text-field>
        </v-form>
        
        <v-form
            ref="images_hero"
            @submit.prevent="postUpdateAccount('images_hero', images_hero)"
        >
            <v-text-field
                label="Hero Image"
                name="images_hero"
                v-model="images_hero"
                placeholder="Large Sized Image URL"
                append-icon="mdi-content-save-outline"
                @click:append="postUpdateAccount('images_hero', images_hero)"
                type="text"
                :loading="images_heroLoading"
                color="input"
            >
                <v-tooltip slot="prepend" left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon 
                            @click="previewImage('Hero Image Preview', images_hero)" 
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-image-size-select-actual
                        </v-icon>
                    </template>
                    <span>Preview</span>
                </v-tooltip>
            </v-text-field>
        </v-form>

        <v-form
            ref="images_tiny"
            @submit.prevent="postUpdateAccount('images_tiny', images_tiny)"
        >
            <v-text-field
                label="Tiny Image"
                name="images_tiny"
                v-model="images_tiny"
                placeholder="Medium Sized Image URL"
                append-icon="mdi-content-save-outline"
                @click:append="postUpdateAccount('images_tiny', images_tiny)"
                type="text"
                :loading="images_tinyLoading"
                color="input"
            >
                <v-tooltip slot="prepend" left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon 
                            @click="previewImage('Tiny Image Preview', images_tiny)" 
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-image-size-select-large
                        </v-icon>
                    </template>
                    <span>Preview</span>
                </v-tooltip>
            </v-text-field>
        </v-form>
        
        <v-form
            ref="images_thumbnail"
            @submit.prevent="postUpdateAccount('images_thumbnail', images_thumbnail)"
        >
            <v-text-field
                label="Thumbnail Image"
                name="images_thumbnail"
                v-model="images_thumbnail"
                placeholder="Thumbnail Sized Image URL"
                append-icon="mdi-content-save-outline"
                @click:append="postUpdateAccount('images_thumbnail', images_thumbnail)"
                type="text"
                :loading="images_thumbnailLoading"
                color="input"
            >
                <v-tooltip slot="prepend" left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon 
                            @click="previewImage('Thumbnail Image Preview', images_thumbnail)" 
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-image-size-select-small
                        </v-icon>
                    </template>
                    <span>Preview</span>
                </v-tooltip>
            </v-text-field>
        </v-form>
        
        <v-form
            ref="publicKey"
            v-show="false"
        >
            <v-textarea
                label="Public Key"
                name="publicKey"
                v-model="publicKey"
                prepend-icon="mdi-account-key"
                append-icon="mdi-content-save-outline"
                @click:append="postUpdateAccount('public_key', publicKey)"
                type="text"
                :rules="publicKeyRules"
                color="input"
            ></v-textarea>
        </v-form>

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                    Details
                    <template v-slot:actions>
                        <v-icon color="error">mdi-information-variant</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list class="transparent">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Account ID
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ accountId }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Roles
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ roles.join(', ') }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Account Creation Date
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ whenAccountCreated }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                    Change Password
                    <template v-slot:actions>
                        <v-icon color="error">mdi-lock-reset</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form
                        ref="password"
                        onSubmit="return false;"
                    >
                        <v-list class="transparent">
                            <v-list-item>
                                <v-text-field
                                    label="Password"
                                    name="password"
                                    v-model="password"
                                    prepend-icon="mdi-form-textbox-password"
                                    type="password"
                                    :rules="passwordRules"
                                    :loading="passwordLoading"
                                    color="input"
                                ></v-text-field>
                            </v-list-item>
                            <v-list-item>
                                <v-text-field
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    v-model="confirmPassword"
                                    prepend-icon="mdi-form-textbox-password"
                                    append-icon="mdi-content-save-outline"
                                    @click:append="postUpdateAccount('password', confirmPassword)"
                                    type="password"
                                    :rules="confirmPasswordRules"
                                    :loading="confirmPasswordLoading"
                                    color="input"
                                ></v-text-field>
                            </v-list-item>
                        </v-list>
                    </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        
        <v-snackbar
            v-model="updateSnackbarSuccessShow"
            :timeout="updateSnackbarSuccessTimeout"
            color="success"
        >
            {{ updateSnackbarSuccessText }}
    
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="updateSnackbarSuccessShow = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        
        <v-dialog
            v-model="imagePreviewDialogShow"
            width="500"
            height="500"
        >
            <v-card>
                <v-card-title class="headline">
                    {{ imagePreviewDialogTitle }}
                </v-card-title>
                <v-card-text>
                    <v-img 
                        :src="imagePreviewDialogSource"
                        contain
                    ></v-img>
                </v-card-text>

            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
import { EventBus } from '../plugins/eventBus.js';
var vue_this;
var store;
var metaverseServer;

export default {
    name: 'MyProfileComponent',
    props: {
        source: String
    },
    data: () => ({
        username: '',
        usernameRules: [
            v => !!v || 'A username is required.'
        ],
        usernameLoading: false,
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
        emailLoading: false,
        images_hero: '',
        images_heroLoading: false,
        images_tiny: '',
        images_tinyLoading: false,
        images_thumbnail: '',
        images_thumbnailLoading: false,
        // availability: '',
        // availabilityRules: [
        //     v => !!v || 'Availability is required.'
        // ],
        publicKey: '',
        publicKeyRules: [
            v => !!v || 'A public key is required.'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'A password is required.'
        ],
        passwordLoading: false,
        confirmPassword: '',
        confirmPasswordRules: [
            v => !!v || 'You must confirm your password.',
            function (v) {
                return v === vue_this.password || 'Your password must match.'
            }
        ],
        confirmPasswordLoading: false,
        // These are not meant to be changed, but rather displayed.
        accountId: '',
        roles: [],
        whenAccountCreated: '',
        // Snackbar Functionality
        updateSnackbarSuccessShow: false,
        updateSnackbarSuccessText: 'Successfully updated profile.',
        updateSnackbarSuccessTimeout: 6000,
        // Image Preview Dialog
        imagePreviewDialogShow: false,
        imagePreviewDialogTitle: '',
        imagePreviewDialogSource: ''
    }),
    methods: {
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },
        
        initialize () {
            this.retrieveAccount(store.account.accountId);
        },
        
        previewImage: function (title, source) {
            this.imagePreviewDialogShow = true;
            this.imagePreviewDialogTitle = title;
            this.imagePreviewDialogSource = source;
        },
        
        setAllLoading: function (to) {
            this.usernameLoading = to;
            this.emailLoading = to;
            this.images_heroLoading = to;
            this.images_tinyLoading = to;
            this.images_thumbnailLoading = to;
        },
        
        // BEGIN handling requests to the API
        
        retrieveAccount: function (userID) {
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;
            
            this.setAllLoading(true);

            window.$.ajax({
                type: 'GET',
                url: metaverseServer + '/api/v1/account/' + userID + parameters
            })
                .done(function (result) {
                    vue_this.setAllLoading(false);

                    vue_this.username = result.data.account.username;
                    // If the username was updated, we'll also update that in our dashboard.
                    vue_this.$store.commit('mutate', {
                        update: true,
                        property: 'account',
                        with: {
                            username: vue_this.username,
                        }
                    });
                    vue_this.email = result.data.account.email;
                    vue_this.publicKey = result.data.account.public_key;
                    vue_this.accountId = result.data.account.accountId;
                    vue_this.roles = result.data.account.roles;
                    vue_this.whenAccountCreated = result.data.account.when_account_created;
                    
                    if (result.data.account.images.hero) {
                        vue_this.images_hero = result.data.account.images.hero;
                    }
                    
                    if (result.data.account.images.tiny) {
                        vue_this.images_tiny = result.data.account.images.tiny;
                    }
                    
                    if (result.data.account.images.thumbnail) {
                        vue_this.images_thumbnail = result.data.account.images.thumbnail;
                    }
                })
                .fail(function (result) {
                    vue_this.setAllLoading(false);

                    console.info('Failed to retrieve account: ', result);

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to retrieve account ' + userID,
                            code: '2',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        },
        
        postUpdateAccount (fieldToUpdate, dataToUpdate) {
            if (!this.$refs[fieldToUpdate].validate()) return;
            
            var objectToPost = {
                'set': dataToUpdate
            };
            
            var parameters = window.$.param({
                "asAdmin": store.account.useAsAdmin
            });
            parameters = "?" + parameters;
            
            this[fieldToUpdate + 'Loading'] = true;

            window.$.ajax({
                type: 'POST',
                url: metaverseServer + '/api/v1/account/' + store.account.accountId + '/field/' + fieldToUpdate + parameters,
                contentType: 'application/json',
                data: JSON.stringify(objectToPost)
            })
                .done(function (result) {
                    console.info('Successfully updated account:', store.account.accountId);
                    vue_this[fieldToUpdate + 'Loading'] = false;
                    vue_this.updateSnackbarSuccessShow = true;
                    vue_this.retrieveAccount(store.account.accountId);
                })
                .fail(function (result) {
                    console.info('Failed to update account:', store.account.accountId);
                    vue_this[fieldToUpdate + 'Loading'] = false;

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to update account ' + store.account.username,
                            code: '3',
                            full: result.responseJSON.error
                        }
                    });

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                    vue_this.retrieveAccount(store.account.accountId);
                })
        },
        
    },
    created: function () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = this.$store.state.metaverseConfig.server;
        
        this.initialize();
    }
}
</script>
