<!--
//  PeopleList.vue
//
//  Created by Kalila L. on 9 Jul 2020.
//  Copyright 2020 Vircadia and contributors.
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
                    People List Component...
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
export default {
    name: 'PeopleList',
    props: {
        source: String
    }
}
</script>
