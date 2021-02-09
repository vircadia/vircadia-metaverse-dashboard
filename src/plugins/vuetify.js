/*
    vuetify.js

    Created by Kalila L. on 7 Jul 2020.
    Copyright 2020 Vircadia contributors.

    Distributed under the Apache License, Version 2.0.
    See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                // primary: '#ee44aa',
                // secondary: '#424242',
                // accent: '#82B1FF',
                // error: '#FF5252',
                info: '#2196F3',
                // success: '#4CAF50',
                // warning: '#FFC107',
                input: colors.purple,
                vircadiaNavy: '#182b49'
            },
            dark: {
                primary: colors.purple.darken3,
                input: colors.purple,
                vircadiaNavy: '#182b49'
            }
        }
    }
})
