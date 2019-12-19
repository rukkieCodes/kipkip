<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-btn
          depressed
          tile
          class="white--text text-capitalize"
          color="indigo accent-4"
          dark
          @click="dialog1 = true"
          >Get Started</v-btn
        >

        <v-snackbar
          :color="color"
          v-model="snackbar"
          top
          right
          class="my-1"
          :timeout="5000"
          :multi-line="true"
        >
          <span :class="snackText">{{ text }}</span>
          <v-btn right :color="snackBtn" icon @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-dialog
        width="40vw"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        v-model="dialog1"
        persistent
      >
        <v-card>
          <v-card-title>
            <span class="headline grey--text text--darken-4">Sign In</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    color="grey darken-4"
                    class="grey--text text--darken-4"
                    v-model="lEmail"
                  >
                    <v-icon class="grey--text text--darken-4" slot="prepend-inner"
                      >mdi-email</v-icon
                    >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    color="grey darken-4"
                    class="grey--text text--darken-4"
                    label="Password*"
                    type="password"
                    v-model="lPassword"
                  >
                    <v-icon
                      class="grey--text text--darken-4"
                      slot="prepend-inner"
                      >mdi-key</v-icon
                    >
                  </v-text-field>
                  <div>
                    <p
                      @click="openDialog2"
                      class="grey--text text--darken-4"
                      style="cursor: pointer;"
                    >
                      <b>Click to Sign Up</b>
                    </p>
                  </div>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn
                    dark
                    color="grey darken-4"
                    small
                    depressed
                    @click="dialog1 = false"
                  >
                    <v-icon left>mdi-close</v-icon>
                    <span class="text-capitalize">Close</span>
                  </v-btn>
                  <v-btn
                    @click="signin"
                    dark
                    color="grey darken-4"
                    small
                    depressed
                    :loading="loading2"
                  >
                    <v-icon left>mdi-location-enter</v-icon>
                    <span class="text-capitalize">Sign In</span>
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        class="dialog2"
        width="40vw"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        v-model="dialog2"
        persistent
      >
        <v-card>
          <v-card-title>
            <span class="headline grey--text text--darken-4">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email*"
                    color="grey darken-4"
                    class="grey--text text--darken-4"
                    required
                  >
                    <v-icon
                      class="grey--text text--darken-4"
                      slot="prepend-inner"
                      >mdi-email</v-icon
                    >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Password*"
                    type="password"
                    color="grey darken-4"
                    class="grey--text text--darken-4"
                    required
                  >
                    <v-icon
                      class="grey--text text--darken-4"
                      slot="prepend-inner"
                      >mdi-key</v-icon
                    >
                  </v-text-field>
                  <br />
                  <div>
                    <p
                      @click="openDialog1"
                      class="grey--text text--darken-3"
                      style="cursor: pointer;"
                    >
                      <b>Click to Sign In!</b>
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn
                    dark
                    color="grey darken-4"
                    depressed
                    small
                    @click="closeDialog2"
                  >
                    <v-icon left>mdi-close</v-icon>
                    <span class="text-capitalize">Close</span>
                  </v-btn>
                  <v-btn
                    @click="signUp"
                    dark
                    color="grey darken-4"
                    depressed
                    small
                    :loading="loading1"
                  >
                    <v-icon left>mdi-location-enter</v-icon>
                    <span class="text-capitalize">Sign Up</span>
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { fb } from "../../firebaseConfig";
export default {
  data: () => ({
    dialog1: false,
    dialog2: false,
    isMobile: false,
    email: null,
    password: null,
    lEmail: null,
    lPassword: null,
    loading1: false,
    loading2: false,
    snackbar: false,
    text: "",
    color: null,
    snackText: null,
    snackBtn: null
  }),

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, {
        passive: true
      });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {
      passive: true
    });
  },

  methods: {
    signin() {
      this.loading2 = true;
      fb.auth()
        .signInWithEmailAndPassword(this.lEmail, this.lPassword)
        .then(user => {
          console.log("Welcome Back: ", user.user.email);
          this.$router.replace("/dashboard/file");
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.loading2 = false;
          if (errorCode == "auth/wrong-password") {
            // alert("wrong Password");
            this.snackbar = true;
            this.text = "Wrong Password";
            this.color = "red darken-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
          } else {
            // alert(errorMessage);
            this.snackbar = true;
            this.text = errorMessage;
            this.color = "red darken-4";
            this.snackText = "white--text";
            this.snackBtn = "white"
          }
          console.log(error);
        });
    },

    signUp() {
      this.loading1 = true;
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
          this.$router.replace("/dashboard/file");
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.loading1 = false;
          if (errorCode === "auth/week-password") {
            // alert("Sorry Your password is week");
            this.snackbar = true;
            this.text = "Sorry Your Password is Week";
            this.color = "red darken-4";
            this.snackText = "white--text";
            this.snackBtn = "white"
          } else {
            // alert(errorMessage);
            this.snackbar = true;
            this.text = errorMessage;
            this.color = "red darken-4";
            this.snackText = "white--text";
            this.snackBtn = "white"
          }
          // console.log(error);
        });
    },

    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
    closeDialog1() {
      this.dialog1 = false;
    },
    closeDialog2() {
      this.dialog2 = false;
    },
    openDialog2() {
      this.dialog1 = false;
      this.dialog2 = true;
    },
    openDialog1() {
      this.dialog2 = false;
      this.dialog1 = true;
    }
  }
};
</script>
