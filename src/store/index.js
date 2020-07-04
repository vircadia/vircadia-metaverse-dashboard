import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: { // Prefilled with initial values
            metaverseName: 'Vircadia',
            metaverseNickname: 'Vircadia',
            metaverseServer: 'http://metaverse.bluestuff.org:9400', // This needs to at least be pre-filled in order to get all other information.
            metaverseIceServer: 'ice.blueplace.org:7337',
            metaverseServerVersion: '1.1.58-alpha+71ea34fac0'
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
