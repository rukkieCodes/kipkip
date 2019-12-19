<template>
  <div id="app">
    <v-app light>
      <Navbar />
      <v-content>
        <section>
          <v-parallax src="../../assets/bg4.png" height="600">
            <v-layout column align-center justify-center class="white--text">
              <img src="../../assets/logo.png" alt="Vuetify.js" height="200" />
              <h1 class="white--text mb-2 display-1 text-center">Rukieo</h1>
              <div class="subheading mb-4 text-center">{{ currentDate }}</div>
              <Form class="text-center" />
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-container grid-list-xl>
            <v-layout row wrap justify-center class="my-12">
              <v-flex xs12 sm4>
                <v-card flat class="transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Company info</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                    volutpat tincidunt ornare. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus
                    bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4 offset-sm1>
                <v-card flat class="transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contact us</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                    volutpat tincidunt ornare.
                  </v-card-text>
                  <v-list class="transparent">
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="blue--text text--lighten-2"
                          >mdi-phone</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>+2347 0113 41999</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="blue--text text--lighten-2"
                          >mdi-map-marker</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title
                          >River State, Nigeria</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon class="blue--text text--lighten-2"
                          >mdi-email</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title
                          >rukkiecodes@gmail.com</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>

        <v-footer color="blue darken-2">
          <v-layout row wrap align-center>
            <v-flex xs12>
              <v-card flat tile width="100%" class="transparent text-center">
                <v-card-text>
                  <v-icon small class="white--text"
                    >mdi-copyright</v-icon
                  >

                  <span class="mx-1 white--text text--darken-4">{{
                    new Date().getFullYear()
                  }}</span>
                  <strong class="subtitle-1 white--text text--darken-4"
                    >RukkieCodes</strong
                  >
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Form from "./Form";
import moment from "moment";

export default {
  data: () => ({
    currentDate: null
  }),

  components: {
    Navbar,
    Form
  },

  methods: {
    updateCurrentDate() {
      this.currentDate = moment().format("LLLL");
    }
  },

  created() {
    this.currentDate = moment().format("LLLL");
    setInterval(() => this.updateCurrentDate(), 1 * 1000);
  }
};
</script>
