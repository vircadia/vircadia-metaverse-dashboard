<!--
//  Domain.vue
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
                        xl="4"
                        lg="4"
                        md="4"
                        xs="12"
                        sm="12"
                    >
                        <RegisterDomain></RegisterDomain>
                    </v-col>
                    <v-col
                        xl="6"
                        lg="6"
                        md="6"
                        xs="12"
                        sm="12"
                    >
                        <div
                            style="max-height: 80vh"
                            class="overflow-y-auto"
                        >
                            <DomainList></DomainList>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import DomainList from '../components/DomainList'
import RegisterDomain from '../components/RegisterDomain'

export default {
    name: 'Domain',
    props: {
        source: String
    },
    components: {
        DomainList,
        RegisterDomain
    }
}
</script>
