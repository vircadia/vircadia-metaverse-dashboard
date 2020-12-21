/*
    index.js

    Created by Kalila L. on 2 Jul 2020.
    Copyright 2020 Vircadia contributors.

    Distributed under the Apache License, Version 2.0.
    See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        icon: 'mdi-login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        name: 'Home',
        icon: 'mdi-home',
        component: Home
    },
    {
        path: '/people',
        name: 'People',
        icon: 'mdi-account-group',
        component: () => import('../views/People.vue')
    },
    {
        path: '/places',
        name: 'Places',
        icon: 'mdi-map-marker-multiple-outline',
        component: () => import('../views/Places.vue')
    },
    {
        path: '/domain',
        name: 'Domain',
        icon: 'mdi-earth',
        component: () => import('../views/Domain.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        icon: 'mdi-account-circle',
        component: () => import('../views/MyProfile.vue')
    },
    { 
        path: '/profile/:user',
        name: 'Profile',
        icon: 'mdi-account-circle',
        component: () => import('../views/MyProfile.vue'),
        children: [
            // MyProfile will be rendered inside User's <router-view>
            // when /user/:id is matched
            { path: '', component: () => import('../views/MyProfile.vue') },

            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            { path: 'profile', component: () => import('../views/UserProfile.vue') }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
