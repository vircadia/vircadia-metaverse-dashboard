<!--
//  Places.vue
//
//  Created by Kalila L. on 23 Sep 2020.
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
                    <PlacesList></PlacesList>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import PlacesList from '../components/PlacesList'

export default {
    name: 'Places',
    props: {
        source: String
    },
    components: {
        PlacesList
    }
}
</script>
