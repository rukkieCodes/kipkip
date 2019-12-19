<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-btn
          depressed
          tile
          class="text-capitalize"
          color="white"
          outlined
          dark
          @click="dialog1 = true"
          >Get Started</v-btn
        >
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-dialog
        width="40vw"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        v-model="dialog1"
        persistent
        transition="slide-y-reverse-transition"
      >
        <v-card class="elevation-12">
          <v-snackbar
            :color="color"
            v-model="snackbar"
            top
            class="my-1"
            :timeout="5000"
            :multi-line="true"
          >
            <span :class="snackText">{{ text }}</span>
            <v-btn right :color="snackBtn" icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>
          <v-toolbar src="../../assets/bg4.png" dark flat>
            <v-toolbar-title class="display-1 font-weight-thin"
              >Sign In</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                v-model="lEmail"
                prepend-icon="mdi-email"
                type="email"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="lPassword"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
            <span
              @click="openDialog2"
              class="grey--text text--darken-4"
              style="cursor: pointer;"
              >Don't have an account? <b>Sign Up Now</b></span
            >
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn @click="closeDialog1" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>

              <v-btn @click="signin" :loading="loading2" icon>
                <v-icon>mdi-location-enter</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        class="dialog2"
        width="40vw"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        v-model="dialog2"
        persistent
        transition="slide-y-transition"
      >
        <v-card class="elevation-12">
          <v-snackbar
            :color="color"
            v-model="snackbar"
            top
            class="my-1"
            :timeout="5000"
            :multi-line="true"
          >
            <span :class="snackText">{{ text }}</span>
            <v-btn right :color="snackBtn" icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>
          <v-toolbar src="../../assets/bg4.png" dark flat>
            <v-toolbar-title class="display-1 font-weight-thin"
              >Sign Up</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                v-model="email"
                prepend-icon="mdi-email"
                type="email"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
            <span
              @click="openDialog1"
              class="grey--text text--darken-4"
              style="cursor: pointer;"
              >Already have an account? <b>Sign In</b></span
            >
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn @click="closeDialog2" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>

              <v-btn @click="signUp" :loading="loading1" icon>
                <v-icon>mdi-location-enter</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
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
          this.$router.replace("/dashboard/Sumary");
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.loading2 = false;
          if (errorCode == "auth/wrong-password") {
            // alert("wrong Password");
            this.snackbar = true;
            this.text = "Wrong Password";
            this.color = "red darken-5";
            this.snackText = "white--text";
            this.snackBtn = "white";
          } else {
            this.snackbar = true;
            this.text = errorMessage;
            this.color = "red darken-5";
            this.snackText = "white--text";
            this.snackBtn = "white";
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
          this.$router.replace("/dashboard/Sumary");
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
            this.snackBtn = "white";
          } else {
            // alert(errorMessage);
            this.snackbar = true;
            this.text = errorMessage;
            this.color = "red darken-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
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
