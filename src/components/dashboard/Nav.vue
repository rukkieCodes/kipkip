<template>
  <nav>
    <v-app-bar flat color="grey lighten-5" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="grey--text text--darken-3"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="grey--text text--darken-3"
        >Rukieo</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="grey--text text--darken-3" icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list shaped dense>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              router
              :to="item.route"
              link
            >
              <v-list-item-icon>
                <v-icon class="grey--text text--darken-3 font-weight-light">{{
                  item.icon
                }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  class="grey--text text--darken-3 font-weight-light"
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item block @click="logout" class="red" dense>
              <v-list-item-icon>
                <v-icon class="white--text text--darken-3 font-weight-light"
                  >mdi-power</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  class="white--text text--darken-3 font-weight-light"
                  >Sign Out</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="#9652ff"
      dark
      src="../../assets/nav1.jpg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-layout
              v-for="user in order"
              :key="user.author"
              column
              align-center
            >
              <v-flex xs12 sm12 md12 lg12 xl12 class="my-5">
                <v-avatar size="100">
                  <v-img :src="user.picture"></v-img>
                </v-avatar>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12 xl12>
                <p class="text-center">
                  {{ user.firstName }} {{ user.lastName }}
                </p>
              </v-flex>
            </v-layout>
            <v-list-item-title class="white--text caption">
              <v-layout class="ml-5" justify-center row wrap>
                <v-flex xs12 sm12 md12 lg12 xl12
                  ><span>Loged in as:</span></v-flex
                >
                <v-flex xs12 sm12 md12 lg12 xl12
                  ><span>{{ email }}</span></v-flex
                >
              </v-layout>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list shaped dense>
        <v-list-item-group color="primary">
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { fb, db } from "../../firebaseConfig";
export default {
  data: () => ({
    read: [],
    drawer: null,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        route: "/dashboard/sumary"
      },
      {
        title: "Todo List",
        icon: "mdi-bookmark-check",
        route: "/dashboard/todo"
      },
      {
        title: "User Profile",
        icon: "mdi-account",
        route: "/dashboard/profile"
      }
    ],
    email: null
  }),

  firestore() {
    const user = fb.auth().currentUser.uid;
    return {
      profiles: db.collection("profiles"),
      order: db.collection("profiles").where("authorId", "==", user)
    };
  },

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
