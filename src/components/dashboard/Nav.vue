<template>
  <nav>
    <v-toolbar flat color="grey lighten-5" class="mt-n3 toolbar">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="gery"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="display:flex;">
        <p class="my-2 mx-2 grey--text text--darken-3">KipKip</p>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn @click="logout" text>
        <span left class="text-capitalize">Sign Out</span>
        <v-icon right>mdi-location-exit</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app color="#9652ff">
      <v-list-item>
        <v-list-item-content>
          <v-layout column align-center>
            <v-flex class="my-5">
              <v-avatar size="100">
                <v-img src="../../assets/guy.jpg"></v-img>
              </v-avatar>
            </v-flex>
          </v-layout>
          <v-list-item-title class="white--text caption">
            <v-layout class="ml-5" justify-center row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12><span>Loged in as</span></v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12><span>{{ email }}</span></v-flex>
            </v-layout>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon class="white--text font-weight-light">{{
              item.icon
            }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text font-weight-light">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { fb } from "../../firebaseConfig";
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        title: "Todos",
        icon: "mdi-bookmark-check",
        route: "/dashboard/todo"
      },
      {
        title: "Profile",
        icon: "mdi-account",
        route: "/dashboard/profile"
      },
      {
        title: "Settings",
        icon: "mdi-settings",
        route: "/dashboard/settings"
      }
    ],
    email: null
  }),
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    var user = fb.auth().currentUser;
    this.email = user.email;
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  position: fixed;
  z-index: 1;
  width: 100vw;
}
</style>
