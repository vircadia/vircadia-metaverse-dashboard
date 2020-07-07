import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firstLoad: true, // We set this to false via App.vue once the store has been loaded for this browsing session.
        metaverseConfig: { // Prefilled with initial values
            name: '',
            nickname: '',
            server: 'http://metaverse.bluestuff.org:9400', // This needs to at least be pre-filled in order to get all other config information.
            iceServer: '',
            serverVersion: ''
        },
        error: {
            title: '',
            code: '',
            full: ''
        },
        account: {
            isLoggedIn: null, // bool
            isAdmin: null, // bool
            username: null,
            // Token data
            accessToken: null,
            tokenType: null,
            createdAt: null, // int
            expiresIn: null, // int
            refreshToken: null,
            scope: null
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
