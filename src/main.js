import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

window.$ = window.jQuery = require('jquery')

Vue.config.productionTip = false;

// GLOBAL CONSTANTS

const globalConsts = { 
    SAFETY_BEFORE_SESSION_TIMEOUT = 21600; // If a token has 6 or less hours left on its life, refresh it.
}

// END GLOBAL CONSTANTS

// ROUTER CONTROLS

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && store.state.account.isLoggedIn === false) {
        next({ name: 'Login' });
    } else if (to.name === 'Login' && store.state.account.isLoggedIn === true) {
        // The user should log out first before trying to access the login page.
        next({ name: 'Home' });
    } else {
        // Verify the user's session is still active.
        var currentTimestamp = Math.floor(new Date().getTime() / 1000); // in seconds
        var sessionTimeLeft = store.state.account.createdAt + store.state.account.expiresIn;

        if (currentTimestamp > sessionTimeLeft ||
            (currentTimestamp - globalConsts.SAFETY_BEFORE_SESSION_TIMEOUT) > sessionTimeLeft) {
            // If the session has expired... Attempt to refresh it.
            window.$.ajax({
                type: 'POST',
                url: store.metaverseConfig.server + '/oauth/token',
                contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                data: {
                    grant_type: 'refresh_token',
                    scope: 'owner',
                    refresh_token: store.account.refreshToken
                }
            })
                .done(function (result) {
                    vue_this.$store.commit('mutate', {
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
                })
                .fail(function (result) {
                    // If this fails for any reason, the user must log back in.
                    store.state.account.isLoggedIn = false;
                    next({ name: 'Login' });
                })
        } else {
            // Good to go, send them on their way.
            next();
        }
    }
})

// END ROUTER CONTROLS

new Vue({
    globalConsts,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
