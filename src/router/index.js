/*
    index.js

    Created by Kalila L. on 2 Jul 2020.
    Copyright 2020 Vircadia contributors.

    Distributed under the Apache License, Version 2.0.
    See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
        meta: {
            showOnMenu: false,
            requiresLogin: false
        }
    },
    {
        path: '/home',
        name: 'Home',
        icon: 'mdi-home',
        meta: {
            showOnMenu: true,
            requiresLogin: true
        },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        icon: 'mdi-login',
        meta: {
            showOnMenu: true,
            requiresLogin: false
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/people',
        name: 'People',
        icon: 'mdi-account-group',
        meta: {
            showOnMenu: true,
            requiresLogin: true
        },
        component: () => import('../views/People.vue')
    },
    {
        path: '/places',
        name: 'Places',
        icon: 'mdi-map-marker-multiple-outline',
        meta: {
            showOnMenu: true,
            requiresLogin: true
        },
        component: () => import('../views/Places.vue')
    },
    {
        path: '/domain',
        name: 'Domain',
        icon: 'mdi-earth',
        meta: {
            showOnMenu: true,
            requiresLogin: true
        },
        component: () => import('../views/Domain.vue')
    },
    {
        path: '/profile/:user?',
        name: 'Profile',
        icon: 'mdi-account-circle',
        meta: {
            showOnMenu: true,
            requiresLogin: false
        },
        component: () => import('../views/UserProfile.vue')
    },
    // Catch-all, for all routes not listed above, redirect to a 404 error page.
    {
        path: '*',
        name: 'PageNotFound',
        icon: 'mdi-help',
        meta: {
            showOnMenu: false,
            requiresLogin: false
        },
        component: () => import('../views/PageNotFound.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
