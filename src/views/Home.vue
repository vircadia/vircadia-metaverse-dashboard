<!--
//  Home.vue
//
//  Created by Kalila L. on 2 Jul 2020.
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
                <v-col class="text-center">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                                <v-btn
                                    :href="source"
                                    icon
                                    large
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>mdi-heart</v-icon>
                                </v-btn>
                        </template>
                        <span>
                            <v-avatar color="pink" size="72" class="mr-2">
                                <v-img src="/assets/231352681.png"></v-img>
                            </v-avatar>
                            I hope you are having a wonderful day, {{ $store.state.account.username }}!
                        </span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    name: 'Home',
    props: {
        source: String
    }
}
</script>
