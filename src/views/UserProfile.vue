<!--
//  UserProfile.vue
//
//  Created by Kalila L. on Dec 21 2020.
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
                        xl="4"
                        lg="4"
                        md="4"
                        xs="12"
                        sm="12"
                    >
                        <UserProfileComponent></UserProfileComponent>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import UserProfileComponent from '../components/UserProfileComponent'

export default {
    name: 'Profile',
    props: {
        source: String
    },
    components: {
        UserProfileComponent
    }
}
</script>
