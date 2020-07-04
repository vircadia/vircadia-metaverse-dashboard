import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: { // Prefilled with initial values
            metaverseName: '',
            metaverseNickname: '',
            metaverseServer: 'http://metaverse.bluestuff.org:9400', // This needs to at least be pre-filled in order to get all other config information.
            metaverseIceServer: '',
            metaverseServerVersion: ''
        },
        account: {
            isLoggedIn: false,
            type: 'user' // Can be "user" or "admin"
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
