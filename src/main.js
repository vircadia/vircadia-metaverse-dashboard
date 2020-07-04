import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// ROUTER CONTROLS

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.state.account.isLoggedIn) next({ name: 'Login' })
    else next()
})

// END ROUTER CONTROLS

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
