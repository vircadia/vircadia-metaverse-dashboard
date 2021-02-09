/*
//  main.js
//
//  Created by Kalila L. on 2 Jul 2020.
//  Copyright 2020 Vircadia contributors.
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

function initializeAjax () {
    window.$.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('x-vircadia-error-handle', 'badrequest');
            xhr.setRequestHeader('Authorization', 'Bearer ' + store.state.account.accessToken);
        }
    });
}

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

function logout () {
    store.commit('mutate', {
        update: true,
        property: 'account',
        with: {
            isLoggedIn: false,
            isAdmin: false,
            accessToken: null,
            refreshToken: null
        }
    });
    router.push({ name: 'Login' });
}

Vue.mixin({
    methods: {
        checkNeedsTokenRefresh: checkNeedsTokenRefresh,
        parseFromStorage: parseFromStorage,
        logout: logout
    }
})

// END GLOBAL FUNCTIONS

// STORE FUNCTIONS

function initStore () {
    var metaverseConfigItems = {
        // Metaverse Config
        server: localStorage.getItem('metaverseConfig.server') // string
    }

    console.info('Initing metaverseConfig.server', metaverseConfigItems.server);

    if (metaverseConfigItems.server !== null) {
        console.info('metaverseConfigItems.server !== null');
        store.commit('mutate', {
            update: true,
            property: 'metaverseConfig',
            with: {
                server: metaverseConfigItems.server
            }
        });
    }

    var accountItems = {
        // Account / General Stuff
        isLoggedIn: parseFromStorage('isLoggedIn'), // bool
        isAdmin: parseFromStorage('isAdmin'), // bool
        useAsAdmin: parseFromStorage('useAsAdmin'), // bool
        username: localStorage.getItem('username'), // string
        accountId: localStorage.getItem('accountId'), // string
        metaverseServer: localStorage.getItem('metaverseServer'), // string
        // Account / Token Stuff
        accessToken: localStorage.getItem('accessToken'), // string
        refreshToken: localStorage.getItem('refreshToken'), // string
        tokenType: localStorage.getItem('tokenType'), // string
        createdAt: parseFromStorage('createdAt'), // int
        expiresIn: parseFromStorage('expiresIn'), // int
        scope: localStorage.getItem('scope') // string
    }

    store.commit('mutate', {
        property: 'account',
        with: accountItems
    });

    var placesItems = {
        // Places / General Stuff
        showOnlyMine: parseFromStorage('showOnlyMine') // bool
    }

    store.commit('mutate', {
        property: 'places',
        with: placesItems
    });

    var dashboardConfig = {
        dashboardTheme: parseFromStorage('dashboardTheme') // int
    }

    store.commit('mutate', {
        property: 'dashboardConfig',
        with: dashboardConfig
    });

    store.commit('mutate', {
        property: 'initialized',
        with: true
    });
}

// END STORE FUNCTIONS

// ROUTER CONTROLS

function attemptRefreshToken () {
    window.$.ajax({
        type: 'POST',
        url: store.state.metaverseConfig.server + '/oauth/token',
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
            console.info('Token refresh successful.');
            return true;
        })
        .fail(function (result) {
            // If this fails for any reason, the user must log back in.
            console.info('Refresh failed.');
            logout();
            return false;
        })
}

router.beforeEach((to, from, next) => {
    // If the store has not yet been initialized...
    console.info('Is the store initialized?', store.state.initialized);
    if (store.state.initialized === false) {
        initStore();
        initializeAjax();
    }

    var routerDebugging = store.state.router.debugging;
    var requestedRoute = to;
    var isLoggedIn = store.state.account.isLoggedIn;

    var query = Object.assign({}, requestedRoute.query);
    if (query.page) {
        // Make the first letter uppercase in case we get e.g. 'places' instead of 'Places'.
        // var pageValue = query.page.substring(0, 1).toUpperCase() + query.page.substring(1);
        var pageValue = query.page;
        if (routerDebugging) console.info('?page parameter set for', pageValue);
        delete query.page;
        router.replace({ query });
        router.push({ path: pageValue });
        return;
    }

    if (routerDebugging) console.info('Is the user logged in?', isLoggedIn);
    if (routerDebugging) console.info('Requested route', requestedRoute);

    // Verify the user's session is still active. If it is not, it will redirect them to login.
    if (isLoggedIn && checkNeedsTokenRefresh()) {
        // If the session has expired... Attempt to refresh it.
        if (routerDebugging) console.info('Token refresh needed, attempting to refresh token.');
        if (!attemptRefreshToken()) {
            return;
        }
    }

    if (requestedRoute.meta.requiresLogin && !isLoggedIn) {
        if (routerDebugging) console.info('Page requires login and user is not logged in, routing to login.');
        store.commit('mutate', {
            update: true,
            property: 'router',
            with: {
                'awaitingRouteOnLogin': true,
                'routeOnLogin': requestedRoute.name
            }
        });

        next({ name: 'Login' });
        return;
    }

    if (requestedRoute.name === 'Login' && isLoggedIn) {
        if (routerDebugging) console.info('User is logged in and trying to access the login page, routing to home.');

        next({ name: 'Home' });
        return;
    }

    // Good to go, send them on their way.
    if (routerDebugging) console.info('All router guards cleared, attempting to continue route to', requestedRoute.name);
    next();
})

// END ROUTER CONTROLS

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
