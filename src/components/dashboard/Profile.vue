<template>
  <v-container fluid>
    <v-snackbar
      :color="color"
      v-model="snackbar"
      :top="top"
      :right="right"
      :timeout="5000"
      :multi-line="multi_line"
    >
      <span :class="snackText">{{ text }}</span>
      <v-btn right :color="snackBtn" icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4 lg4 xl4>
        <v-card class="mx-auto" max-width="100%" tile>
          <v-img height="50%">
            <v-row
              v-for="profile in read"
              :key="profile.author"
              align="end"
              class="fill-height"
            >
              <v-layout justify-center>
                <v-avatar
                  v-for="pix in profile.picture"
                  :key="pix.id"
                  class="profile mt-4"
                  size="200"
                  tile
                >
                  <v-img :src="pix"></v-img>
                </v-avatar>
              </v-layout>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title
                      class="title text-center grey--text text--darken-3"
                      >{{ profile.firstName }} {{ profile.lastName }} ({{
                        profile.userName
                      }})</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>

        <v-card class="mt-n4" v-for="profile in read" :key="profile.author" flat>
          <v-card-text>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-3"
                  >Username</v-list-item-title
                >
                <v-list-item-subtitle class="grey--text text--darken-4">{{
                  profile.userName
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="mt-n2" two-line>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-3"
                  >Full Name</v-list-item-title
                >
                <v-list-item-subtitle class="grey--text text--darken-4"
                  >{{ profile.firstName }}
                  {{ profile.lastName }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="mt-n2" two-line>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-3"
                  >Email Address</v-list-item-title
                >
                <v-list-item-subtitle class="grey--text text--darken-4">{{
                  profile.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="mt-n2" two-line>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-3"
                  >Nationality</v-list-item-title
                >
                <v-list-item-subtitle class="grey--text text--darken-4">{{
                  profile.country
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="mt-n2" two-line>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-3"
                  >City</v-list-item-title
                >
                <v-list-item-subtitle class="grey--text text--darken-4">{{
                  profile.city
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="mt-n2" two-line>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-3"
                  >Favorite Quote</v-list-item-title
                >
                <v-list-item-subtitle class="grey--text text--darken-4">{{
                  profile.quote
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md8 lg8 xl8>
        <v-card class="mt-4 mx-auto" max-width="90%">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#3cd1c2"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-card color="indigo accent-4" flat width="100%" height="100%">
              <v-card-text>
                <div class="text-left headline font-weight-light white--text">
                  Edit Profile
                </div>
                <div class="text-left body-2 font-weight-light white--text">
                  Complete you profile
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>

          <v-card-text class="pt-0 mt-12">
            <v-form>
              <v-layout row wrap>
                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <input @change="uploadPhoto" type="file" />
                </v-flex>

                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <v-text-field
                    label="Username"
                    type="text"
                    v-model="profile.userName"
                  />
                </v-flex>

                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <v-text-field
                    label="Email Address"
                    type="email"
                    v-model="profile.email"
                  />
                </v-flex>

                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <v-text-field
                    label="First Name"
                    type="text"
                    v-model="profile.firstName"
                  />
                </v-flex>

                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <v-text-field
                    label="Last Name"
                    type="text"
                    v-model="profile.lastName"
                  />
                </v-flex>

                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <v-text-field
                    label="Country"
                    type="text"
                    v-model="profile.country"
                  />
                </v-flex>

                <v-flex class="px-5" xs12 sm6 md6 lg6 xl6>
                  <v-text-field
                    label="City"
                    type="text"
                    v-model="profile.city"
                  />
                </v-flex>

                <v-flex class="px-5 mt-4" xs12 sm6 md6 lg6 xl6>
                  <v-textarea
                    label="Favorite Quot"
                    type="text"
                    :no-resize="true"
                    height="17"
                    v-model="profile.quote"
                  ></v-textarea>
                </v-flex>

                <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                  <v-btn
                    @click="submit"
                    :loading="loading"
                    color="#58B05C"
                    width="100%"
                  >
                    <span class="white--text">Edit</span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db, fb } from "../../firebaseConfig";
import moment from "moment";

export default {
  data: () => ({
    read: [],
    profile: {
      picture: [],
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      quote: "",
      author: fb.auth().currentUser.uid,
      month: moment().format("MMMM"),
      day: moment().format("dddd"),
      year: moment().format("YYYY"),
      createdAt: new Date().toISOString().substr(0, 10)
    },
    snackbar: false,
    text: "",
    color: null,
    snackText: null,
    snackBtn: null,
    top: null,
    right: null,
    loading: false,
    multi_line: null
  }),

  firestore() {
    const user = fb.auth().currentUser.uid;
    return {
      todos: db.collection("profile"),
      read: db.collection("profile").where("author", "==", user)
    };
  },

  methods: {
    submit() {
      this.loading = true;
      this.$firestore.todos
        .add(this.profile)
        .then(docRef => {
          console.log(docRef);
          this.snackbar = true;
          this.color = "#3cd1c2";
          this.text = "Profile Successfuly Updated";
          this.snackText = "white--text";
          this.loading = false;
          this.snackBtn = "white";
          this.multi_line = false;
        })
        .catch(error => {
          const errorMessage = error.message;
          console.log(errorMessage);
          this.snackbar = true;
          this.color = "red darken-4";
          this.text = errorMessage;
          this.snackText = "white--text";
          this.loading = false;
          this.snackBtn = "white";
          this.multi_line = true;
        });
    },

    uploadPhoto(event) {
      let file = event.target.files[0];
      var storageRef = fb.storage().ref("profilePictures/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const math = (progress * 100) / 100;
          const calc = Math.round(math);
          console.log("Upload is " + calc + "% done");
          this.value = calc;
          if (calc == 100) {
            this.top = true;
            this.right = true;
            this.bottom = false;
            this.left = false;
            this.snackbar = true;
            this.text = "Image Upload Successfull";
            this.color = "white";
            this.snackText = "green--text";
            this.snackBtn = "green";
            this.disable = false;
          }
        },
        error => {
          // console.error(error);
          const errorMessage = error.message;
          this.top = true;
          this.right = true;
          this.bottom = false;
          this.left = false;
          this.snackbar = true;
          this.text = errorMessage;
          this.color = "red darken-4";
          this.snackText = "white--text";
          this.snackBtn = "white";
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(getDownloadURL => {
            this.profile.picture.push(getDownloadURL);
            console.log("file available at", getDownloadURL);
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.left-side {
  .my-img {
    margin: auto;
    display: block;
  }
}
</style>
