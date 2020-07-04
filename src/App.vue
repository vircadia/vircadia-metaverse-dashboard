<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list v-if="this.$store.state.account.isLoggedIn">
                <v-list-item link @click.native="this.$router.push('/')">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click.native="this.$router.push('/Users')">
                    <v-list-item-action>
                        <v-icon>mdi-user</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-else>
                <v-list-item link @click.native="this.$router.push('/Login')">
                    <v-list-item-action>
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Vircadia</v-toolbar-title>
        </v-app-bar>
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/login">Login</router-link> |
        </div> -->
        <router-view/>

        <v-footer
            color="primary"
            app
        >
            <span class="white--text">Apollo Dashboard v0.0.1a - Vircadia Metaverse Services</span>
            <v-spacer></v-spacer>
            <span class="white--text">Connected to <b>{{ this.$store.state.config.metaverseServer }} {{ this.$store.state.config.metaverseServerVersion }}</b></span>
        </v-footer>
    </v-app>

</template>

<script>
export default {
    name: 'App',
    components: {
    },
    methods: {
        retrieveMetaverseConfig: function (metaverseURL) {
            window.$.ajax({
                type: 'GET',
                url: metaverseURL + '/api/metaverse_info'
            })
                .done(function (result) {
                    console.info('success', JSON.stringify(result))
                })
                .fail(function (result) {
                    console.info('error', JSON.stringify(result))
                })
        }
    },
    created: function () {
        var store = this.$store.state
        if (store.config.metaverseServer) {
            this.retrieveMetaverseConfig(store.config.metaverseServer)
        }
    },
    data: () => ({
        drawer: null
    })
}
</script>
