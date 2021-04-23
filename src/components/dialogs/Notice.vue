<!--
//  Notice.vue
//
//  Created by Kalila L. on Apr 23 2021.
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
                <v-icon color="blue" class="mr-2">mdi-comment-question</v-icon>
                {{ this.$store.state.dialog.notice.title }}
            </v-card-title>

            <v-card-text>
                {{ this.$store.state.dialog.notice.message }}
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
    name: 'Notice',
    methods: {
    },
    data: () => ({
        showDialogInternal: true
    }),
    created: function () {
    }
};
</script>
