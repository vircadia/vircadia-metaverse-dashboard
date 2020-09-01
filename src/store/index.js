/*
//  index.js
//
//  Created by Kalila L. on 2 Jul 2020.
//  Copyright 2020 Vircadia and contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        globalConsts: {
            SAFETY_BEFORE_SESSION_TIMEOUT: 21600 // If a token has 6 or less hours left on its life, refresh it.
        },
        initialized: false,
        metaverseConfig: { // Prefilled with initial values
            name: '',
            nickname: '',
            server: 'https://metaverse.bluestuff.org:9400/', // This needs to at least be pre-filled in order to get all other config information.
            iceServer: '',
            serverVersion: ''
        },
        error: {
            title: '',
            code: '',
            full: ''
        },
        account: {
            isLoggedIn: false, // bool
            isAdmin: true, // bool FIXME: defaulting to true for now since we have no way to retrieve this information cleanly.
            useAsAdmin: false, // bool
            username: null, // string
            // Token data
            accessToken: null, // string
            refreshToken: null, // string
            tokenType: null, // string
            createdAt: null, // int
            expiresIn: null, // int
            scope: null // string
        }
    },
    mutations: {
        mutate (state, payload) {
            if (!payload.update) {
                state[payload.property] = payload.with;
            } else {
                for (var item in payload.with) {
                    if (Object.prototype.hasOwnProperty.call(state[payload.property], item)) {
                        state[payload.property][item] = payload.with[item];
                    }
                }
            }
            console.info('Payload:', payload.property, 'with:', payload.with, 'state is now:', this.state);
        }
    },
    actions: {
    },
    modules: {
    }
})
