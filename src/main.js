/*
//  main.js
//
//  Created by Kalila L. on 2 Jul 2020.
//  Copyright 2020 Vircadia and contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// MAIN APPLICATION INITIALIZATION

window.$ = window.jQuery = require('jquery')
window.$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('x-vircadia-error-handle', 'badrequest');
    }
});

Vue.config.productionTip = false;

// END MAIN APPLICATION INITIALIZATION

// GLOBAL FUNCTIONS

function checkNeedsTokenRefresh () {
    var currentTimestamp = Math.floor(new Date().getTime() / 1000); // in seconds
    var sessionExpirationTime = parseInt(store.state.account.createdAt) + parseInt(store.state.account.expiresIn);

    // console.info('createdAt', Object.prototype.toString.call(store.state.account.createdAt), 'expiresIn', Object.prototype.toString.call(store.state.account.expiresIn))
    // console.info('currentTimestamp', currentTimestamp, Object.prototype.toString.call(currentTimestamp))
    // console.info('sessionExpirationTime', sessionExpirationTime, Object.prototype.toString.call(sessionExpirationTime))

    if (currentTimestamp > sessionExpirationTime ||
        (currentTimestamp - store.state.globalConsts.SAFETY_BEFORE_SESSION_TIMEOUT) > sessionExpirationTime) {
        return true;
    } else {
        return false;
    }
}

function parseFromStorage (item) {
    var itemToSendBack;
    var retrievedItem = localStorage.getItem(item);
    if (!retrievedItem || retrievedItem === 'undefined') {
        itemToSendBack = undefined;
    } else {
        try {
            itemToSendBack = JSON.parse(retrievedItem);
        } catch (error) {
            console.info('Error retrieving', item, 'from storage. Parsing error:', error);
        }
    }

    return itemToSendBack;
}

Vue.mixin({
    methods: {
        checkNeedsTokenRefresh: checkNeedsTokenRefresh,
        parseFromStorage: parseFromStorage
    }
})

// END GLOBAL FUNCTIONS

// STORE FUNCTIONS

function initStore () {
    var storedItems = {
        isLoggedIn: parseFromStorage('isLoggedIn'), // bool
        isAdmin: parseFromStorage('isAdmin'), // bool
        useAsAdmin: parseFromStorage('useAsAdmin'), // bool
        username: localStorage.getItem('username'), // string
        // Token data
        accessToken: parseFromStorage('accessToken'), // int
        tokenType: localStorage.getItem('tokenType'), // string
        createdAt: parseFromStorage('createdAt'), // int
        expiresIn: parseFromStorage('expiresIn'), // int
        refreshToken: parseFromStorage('refreshToken'), // int
        scope: localStorage.getItem('scope') // string
    }

    store.commit('mutate', {
        property: 'account',
        with: storedItems
    });

    store.commit('mutate', {
        property: 'initialized',
        with: true
    });
}

// END STORE FUNCTIONS

// ROUTER CONTROLS

router.beforeEach((to, from, next) => {
    console.info('Attempting to navigate to:', to.name)

    // If the store has not yet been initialized...
    console.info('store.initialized', store.state.initialized);
    if (store.state.initialized === false) {
        initStore();
    }

    console.info('Is the user logged in?', store.state.account.isLoggedIn);

    if (to.name !== 'Login' && !store.state.account.isLoggedIn) {
        console.info('Attempting to access a page while logged out, routing to login.');
        next({ name: 'Login' });
    } else if (to.name === 'Login' && store.state.account.isLoggedIn === true) {
        // The user should log out first before trying to access the login page.
        console.info('Attemping to access login before logging out, re-routing to home.');
        next({ name: 'Home' });
    } else if (to.name === 'Login' && !store.state.account.isLoggedIn) {
        console.info('Attempting to access login while logged out, routing to login.');
        next();
    } else { // For any other case...
        // Verify the user's session is still active. If it is not, it will redirect them to login.
        console.info('All other routing cases... Checking if a token refresh is needed.');
        if (checkNeedsTokenRefresh()) {
            // If the session has expired... Attempt to refresh it.
            console.info('Token refresh needed. Attempting to refresh token.');

            window.$.ajax({
                type: 'POST',
                url: store.state.metaverseConfig.server + 'oauth/token',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                data: {
                    grant_type: 'refresh_token',
                    scope: store.state.account.scope,
                    refresh_token: store.state.account.refreshToken
                }
            })
                .done(function (result) {
                    store.commit('mutate', {
                        update: true,
                        property: 'account',
                        with: {
                            isLoggedIn: true,
                            accessToken: result.access_token,
                            tokenType: result.token_type,
                            createdAt: result.created_at,
                            expiresIn: result.expires_in,
                            refreshToken: result.refresh_token,
                            scope: result.scope
                        }
                    });
                    console.info('Token refresh successful, routing to', to)
                    next();
                })
                .fail(function (result) {
                    // If this fails for any reason, the user must log back in.
                    console.info('Refresh failed, re-routing to login.');
                    store.commit('mutate', {
                        update: true,
                        property: 'account',
                        with: {
                            isLoggedIn: false
                        }
                    });
                    next({ name: 'Login' });
                })
        } else {
            // Good to go, send them on their way.
            console.info('Refresh not needed, attempting to continue route to', to);
            next();
        }
    }
})

// END ROUTER CONTROLS

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
