<!--
//  ErrorOccurred.vue
//
//  Created by Kalila L. on 5 Jul 2020.
//  Copyright 2020 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<template>
    <v-dialog
        width="500"
        persistent
        v-model="showDialogInternal"
    >
        <v-card>
            <v-card-title
                class="headline"
                primary-title
                dark
            >
                <v-icon color="red" class="mr-2">mdi-comment-question</v-icon>
                {{ this.$store.state.error.title }}
            </v-card-title>

            <v-card-text>
                Error code <code>{{ this.$store.state.error.code }}</code> <br />
                The full error is shown below: <br />
                <code>{{ this.$store.state.error.full }}</code>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    @click="$emit('close-dialog')"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ErrorOccurred',
    methods: {
    },
    data: () => ({
        showDialogInternal: true
    }),
    created: function () {
    }
};
</script>
