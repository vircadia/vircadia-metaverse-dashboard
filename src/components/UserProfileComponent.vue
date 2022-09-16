<!--
//  UserProfileComponent.vue
//
//  Created by Kalila L. on Dec 20 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-form>
        <v-card v-if="isCardLoading && !userEditMode">
            <div class="text-center">
                <v-progress-linear
                    indeterminate
                    color="primary"
                ></v-progress-linear>
            </div>
        </v-card>
        <v-card v-else>
            <v-img
                height="80px"
                class="userProfileHero"
                :src="images_hero"
            >
                <v-card-title>
                    <v-avatar
                        v-show="images_thumbnail"
                        class="mr-5"
                        @click="previewImage('Avatar', images_thumbnail)"
                    >
                        <img :src="images_thumbnail">
                    </v-avatar>
                    <span class="white--text">{{ username }}</span>
                    <v-spacer></v-spacer>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                @click="userEditMode = !userEditMode"
                                color="input"
                                class="info"
                                small
                                fab
                                :disabled="!canEditUser(null)"
                            >
                                <v-icon v-text="!userEditMode ? 'mdi-account-edit' : 'mdi-image-text'"></v-icon>
                            </v-btn>
                        </template>
                        <span v-text="!userEditMode ? 'Edit' : 'View'"></span>
                    </v-tooltip>
                </v-card-title>
            </v-img>

            <v-scroll-x-transition
                :hide-on-leave="true"
            >
                <v-card-text v-show="!userEditMode" class="text-left">
                    <div class="grey--text">
                        Created {{ whenAccountCreatedDate }} <i>({{ calculateDaysSinceCreationDate }} days)</i>
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="subtitle-1">
                        Bio
                    </div>

                    <div>Coming soon...</div>

                    <v-divider class="my-4"></v-divider>

                    <div class="subtitle-1">
                        Links
                    </div>

                    <div>Coming soon...</div>

                    <v-divider class="my-4"></v-divider>

                    <v-expansion-panels>
                        <v-expansion-panel
                            :disabled="!online"
                        >
                            <v-expansion-panel-header>
                                {{ online ? "Online" : "Offline" }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list class="transparent">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Session ID
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ sessionID }}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-scroll-x-transition>
            <v-scroll-x-reverse-transition
                :hide-on-leave="true"
            >
                <v-card-text v-show="userEditMode" class="text-left">
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
                </v-card-text>
            </v-scroll-x-reverse-transition>
        </v-card>

        <v-expansion-panels v-show="!isCardLoading">
            <v-expansion-panel
                v-show="!userEditMode"
            >
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
                        <v-list-item
                            v-show="roles.length > 0"
                        >
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
            <v-expansion-panel
                v-show="userEditMode"
            >
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
                                    label="New Password"
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
            <v-expansion-panel
                v-show="userEditMode && $store.state.account.useAsAdmin"
            >
                <v-expansion-panel-header disable-icon-rotate>
                    Change Roles
                    <template v-slot:actions>
                        <v-icon color="error">mdi-account-settings</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form
                        ref="roles"
                        onSubmit="return false;"
                    >
                        <v-list class="transparent">
                            <v-list-item>
                                <v-select
                                    v-model="roles"
                                    :items="getPossibleRoles"
                                    :rules="rolesRules"
                                    :loading="rolesLoading"
                                    mandatory
                                    chips
                                    label="Roles"
                                    multiple
                                    outlined
                                    v-on:change="postUpdateAccount('roles', roles)"
                                ></v-select>
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
    name: 'UserProfileComponent',
    props: ['userToLoad'],
    data: () => ({
        username: '',
        usernameRules: [
            v => !!v || 'A username is required.'
        ],
        usernameLoading: false,
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
        accountId: '',
        roles: [],
        rolesRules: [],
        rolesLoading: false,
        possibleRoles: ['admin', 'user'],
        possibleRolesWhenIsUser: ['user'],
        whenAccountCreated: '',
        online: false,
        sessionID: null,
        // Snackbar Functionality
        updateSnackbarSuccessShow: false,
        updateSnackbarSuccessText: 'Successfully updated profile.',
        updateSnackbarSuccessTimeout: 6000,
        // Image Preview Dialog
        imagePreviewDialogShow: false,
        imagePreviewDialogTitle: '',
        imagePreviewDialogSource: '',
        // Main Functionality
        accountToManage: null,
        userEditMode: false,
        isCardLoading: false
    }),
    methods: {
        sendEvent: function (command, data) {
            EventBus.$emit(command, data);
        },

        initialize () {
            var params = new URLSearchParams(window.location.search);

            if (this.userToLoad) {
                this.accountToManage = this.userToLoad;
            } else if (params.has('user')) {
                this.accountToManage = params.get('user');
            } else if (this.$route.params && this.$route.params.user) {
                this.accountToManage = this.$route.params.user;
            } else {
                this.accountToManage = this.$store.state.account.accountId;
            }

            // alert('this.$route.params.user' + this.$route.params.user);

            this.retrieveAccount(encodeURI(this.accountToManage));
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

            this.isCardLoading = to;
        },

        canEditUser: function () {
            return (store.account.isAdmin && store.account.useAsAdmin) || (this.accountId === this.$store.state.account.accountId);
        },

        // BEGIN handling requests to the API

        retrieveAccount: function (userIdentifier) {
            var parameters = window.$.param({
                'asAdmin': store.account.useAsAdmin
            });
            parameters = '?' + parameters;

            console.info('retrieving user:', userIdentifier);

            var apiToRequest = (store.account.isLoggedIn ? 'account' : 'profile');

            this.setAllLoading(true);

            window.$.ajax({
                type: 'GET',
                url: metaverseServer + '/api/v1/' + apiToRequest + '/' + userIdentifier + parameters
            })
                .done(function (result) {
                    vue_this.setAllLoading(false);

                    vue_this.username = result.data.account.username;
                    vue_this.email = result.data.account.email;
                    vue_this.publicKey = result.data.account.public_key;
                    vue_this.accountId = result.data.account.accountId;
                    if (result.data.account.roles) {
                        vue_this.roles = result.data.account.roles;
                    }
                    vue_this.whenAccountCreated = result.data.account.when_account_created;
                    vue_this.online = result.data.account.location.online;
                    vue_this.sessionID = result.data.account.location.node_id;

                    if (result.data.account.images.hero) {
                        vue_this.images_hero = result.data.account.images.hero;
                    } else {
                        vue_this.images_hero = '../assets/1920_bar.png';
                    }

                    if (result.data.account.images.tiny) {
                        vue_this.images_tiny = result.data.account.images.tiny;
                    } else {
                        vue_this.images_tiny = '../assets/vircadia-icon-256.png';
                    }

                    if (result.data.account.images.thumbnail) {
                        vue_this.images_thumbnail = result.data.account.images.thumbnail;
                    } else {
                        vue_this.images_thumbnail = '../assets/vircadia-icon-256.png';
                    }
                })
                .fail(function (result) {
                    vue_this.setAllLoading(false);

                    console.info('Failed to retrieve', apiToRequest, result);

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to retrieve ' + apiToRequest + ' ' + userIdentifier,
                            code: '2',
                            full: result.responseJSON.message
                        }
                    });

                    // TODO This is a temporary workaround, the token refresh in main.js should catch this, thus this should be removed later:
                    if (result.responseJSON.message.toLowerCase() === 'Invalid token' || result.responseJSON.message.toLowerCase() === 'jwt malformed') {
                        vue_this.logout();
                    }

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                })
        },

        postUpdateAccount (fieldToUpdate, dataToUpdate) {
            if (!this.$refs[fieldToUpdate].validate()) return;

            var objectToPost = {
                'set': dataToUpdate
            };

            var parameters = window.$.param({
                'asAdmin': store.account.useAsAdmin
            });
            parameters = '?' + parameters;

            this[fieldToUpdate + 'Loading'] = true;

            window.$.ajax({
                type: 'POST',
                url: metaverseServer + '/api/v1/account/' + vue_this.accountId + '/field/' + fieldToUpdate + parameters,
                contentType: 'application/json',
                data: JSON.stringify(objectToPost)
            })
                .done(function (result) {
                    console.info('Successfully updated account:', vue_this.accountToManage);
                    vue_this[fieldToUpdate + 'Loading'] = false;
                    vue_this.updateSnackbarSuccessShow = true;
                    vue_this.retrieveAccount(vue_this.accountToManage);
                })
                .fail(function (result) {
                    console.info('Failed to update account:', vue_this.accountToManage);
                    vue_this[fieldToUpdate + 'Loading'] = false;

                    vue_this.$store.commit('mutate', {
                        property: 'error',
                        with: {
                            title: 'Failed to update account ' + vue_this.accountToManage,
                            code: '3',
                            full: result.responseJSON.message
                        }
                    });

                    // TODO This is a temporary workaround, the token refresh in main.js should catch this, thus this should be removed later:
                    if (result.responseJSON.message.toLowerCase() === 'Invalid token' || result.responseJSON.message.toLowerCase() === 'jwt malformed') {
                        vue_this.logout();
                    }

                    vue_this.sendEvent('open-dialog', { which: 'ErrorOccurred', shouldShow: true });
                    vue_this.retrieveAccount(vue_this.accountToManage);
                })
        }

    },

    computed: {
        calculateDaysSinceCreationDate () {
            // e.g. 2020-09-13T04:38:44.402Z -> 2020-09-13
            var creationDate = this.whenAccountCreated.split('T')[0];
            // e.g. 2020-09-13 -> 2020/09/13
            creationDate = creationDate.split('-').join('/');

            var currentDate = new Date();
            var dd = String(currentDate.getDate()).padStart(2, '0');
            var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
            var yyyy = currentDate.getFullYear();
            currentDate = yyyy + '/' + mm + '/' + dd;

            const diffTime = Math.abs(Date.parse(currentDate) - Date.parse(creationDate));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays;
        },

        whenAccountCreatedDate () {
            // e.g. 2020-09-13T04:38:44.402Z -> 2020-09-13
            var creationDate = this.whenAccountCreated.split('T')[0];
            // e.g. 2020-09-13 -> 2020/09/13
            return creationDate.split('-').join('/');
        },

        getPossibleRoles () {
            if (this.accountId === store.account.accountId) {
                return this.possibleRolesWhenIsUser;
            } else {
                return this.possibleRoles;
            }
        }
    },

    watch: {
        userToLoad: {
            handler: function () {
                this.accountToManage = this.userToLoad;
                this.retrieveAccount(this.userToLoad);
            }
        }
    },

    created: function () {
        vue_this = this;
        store = this.$store.state;
        metaverseServer = this.$store.state.metaverseConfig.server;

        this.initialize();
    }
}
</script>
