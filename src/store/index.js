import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
            isLoggedIn: false,
            type: 'user' // Can be 'user' or 'admin'
        }
    },
    mutations: {
        mutate (state, payload) {
            state[payload.property] = payload.with;
            console.info('Payload:', payload.property, 'with:', payload.with, 'state is now:', this.state);
        }
    },
    actions: {
    },
    modules: {
    }
})
