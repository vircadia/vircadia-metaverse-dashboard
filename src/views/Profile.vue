<!--
//  Profile.vue
//
//  Created by Kalila L. on 8 Jul 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="4"
                    >
                        <ProfileComponent></ProfileComponent>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import ProfileComponent from '../components/ProfileComponent'

export default {
    name: 'Profile',
    props: {
        source: String
    },
    components: {
        ProfileComponent
    }
}
</script>
