<template>
  <v-container fluid>
    <v-snackbar
      :color="color"
      v-model="snackbar"
      top
      :timeout="5000"
      :multi-line="true"
    >
      <span :class="snackText">{{ text }}</span>
      <v-btn right :color="snackBtn" icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex class="mb-12" xs12 sm12 md4 lg4 xl4>
        <v-layout class="px-5" justify-center>
          <v-card
            color="grey lighten-3"
            flat
            :outlined="true"
            @click="dialog1 = true"
            v-show="order <= 0"
            width="400"
            height="400"
          >
            <v-card-text>
              <v-layout class="mt-12" row wrap>
                <v-flex class="mt-12" xs12 sm12 md12 lg12 xl12>
                  <v-layout justify-center>
                    <v-btn class="mt-10" icon x-large>
                      <v-icon x-large>mdi-account-edit</v-icon>
                    </v-btn>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-layout justify-center>
                    <span class="text-center display-1">Edit Profile</span>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-layout>
        <v-layout v-for="user in order" :key="user.author" justify-center>
          <v-avatar class="mx-auto" size="220">
            <v-img :src="user.picture"></v-img>
          </v-avatar>
        </v-layout>
        <v-layout
          v-for="user in order"
          :key="user.author"
          class="mt-5"
          justify-center
        >
          <p>{{ user.firstName }} {{ user.lastName }} ({{ user.userName }})</p>
        </v-layout>

        <v-layout justify-center>
          <v-list v-for="user in order" :key="user.author" color="transparent">
            <v-layout row wrap>
              <v-flex xs11 sm11 md11 lg11 xl11>
                <v-subheader>Profile</v-subheader>
              </v-flex>

              <v-flex xs1 sm1 md1 lg1 xl1>
                <v-btn @click="openUpdateDialog(user)" class="mt-3" x-small icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-list-item-group color="indigo accent-4">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ user.firstName }} {{ user.lastName }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.userName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-globe-model</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.nationality }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home-city</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.city }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm12 mg8 lg8 xl8>
        <v-layout justify-center>
          <h1 class="display-1">Your Timeline</h1>
        </v-layout>
            <v-card
              class="pa-0 ma-0"
              flat
              width="100%"
              tile
              v-for="todo in orderTodos"
              :key="todo.title"
              :class="`todo ${todo.state}`"
            >
              <v-card-text class="ma-0 my-2 pa-0 px-4 py-1">
                <v-layout class="my-0" row wrap>
                  <v-flex class="pl-5" xs5 sm5 md5 lg6 xl6>
                    <v-layout class="mt-1" row wrap>
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <span>Task</span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <span
                          class="grey--text text--darken-2 body-2 ma-0 pa-0"
                          >{{ todo.title }}</span
                        >
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex class="pl-2" xs3 sm3 md4 lg4 xl4>
                    <v-layout class="mt-1" row wrap>
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <span>Due Date</span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <span
                          class="grey--text text--darken-2 body-2 ma-0 pa-0"
                          >{{ todo.date }}</span
                        >
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex class="pl-2" xs3 sm1 md1 lg1 xl1>
                    <v-layout class="mt-1" row wrap>
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <span>State</span>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-chip
                          x-small
                          ripple
                          :class="
                            `${todo.state} white--text caption ma-0 pa-0 px-2 py-2`
                          "
                        >
                          <span class="caption">{{ todo.state }}</span>
                        </v-chip>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
              </v-card-text>
            </v-card>
      </v-flex>
    </v-layout>

    <v-row justify="center">
      <!-- Edit Profile Dialog -->
      <v-dialog
        v-model="dialog1"
        transition="dialog-bottom-transition"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        persistent
      >
        <v-card>
          <v-toolbar dark color="indigo accent-4">
            <v-btn icon dark @click="closeDialog1">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-linear
              :active="loading1"
              :indeterminate="loading1"
              absolute
              bottom
              :color="progressColor"
            ></v-progress-linear>

            <v-toolbar-items>
              <v-btn dark text :loading="loading3" @click="editProfile"
                >Edit</v-btn
              >
            </v-toolbar-items>
          </v-toolbar>

          <v-snackbar
            :color="color"
            v-model="snackbar"
            top
            :timeout="5000"
            :multi-line="true"
          >
            <span :class="snackText">{{ text }}</span>
            <v-btn right :color="snackBtn" icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>

          <v-form ref="editProfileForm">
            <v-layout class="mt-12" row wrap justify-center>
              <v-flex class="px-5 mb-5" xs12 sm12 md12 lg12 xl12>
                <v-layout justify-center>
                  <input type="file" @change="uploadProfilePicture" />
                </v-layout>
              </v-flex>
              <v-flex class="px-5 mb-5" xs12 sm12 md12 lg12 xl12>
                <v-layout justify-center>
                  <v-avatar
                    v-for="user in order"
                    :key="user.author"
                    size="200"
                    tile
                  >
                    <v-img :src="user.picture"></v-img>
                  </v-avatar>
                </v-layout>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Username"
                  prepend-inner-icon="mdi-account-edit"
                  color="indigo darken-4"
                  v-model="profile.userName"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md6 lg12 xl12>
                <v-text-field
                  label="First Name"
                  prepend-inner-icon="mdi-account-edit"
                  color="indigo darken-4"
                  v-model="profile.firstName"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>

              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Last Name"
                  prepend-inner-icon="mdi-account-edit"
                  color="indigo darken-4"
                  v-model="profile.lastName"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  color="indigo darken-4"
                  v-model="profile.email"
                  type="email"
                  :rules="emailRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Nationality"
                  prepend-inner-icon="mdi-globe-model"
                  color="indigo darken-4"
                  v-model="profile.nationality"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="City"
                  prepend-inner-icon="mdi-home-city"
                  color="indigo darken-4"
                  v-model="profile.city"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- For Update Profile -->
      <v-dialog
        v-model="dialog2"
        transition="dialog-bottom-transition"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card v-for="user in order" :key="user.author">
          <v-toolbar dark color="indigo accent-4">
            <v-btn icon dark @click="closeDialog2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Update Profile</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-progress-linear
              :active="loading2"
              :indeterminate="loading2"
              absolute
              bottom
              :color="progressColor"
            ></v-progress-linear>
            <v-toolbar-items>
              <v-btn dark text :loading="loading4" @click="updateProfile(user)"
                >Update</v-btn
              >
            </v-toolbar-items>
          </v-toolbar>

          <v-snackbar
            :color="color"
            v-model="snackbar"
            top
            :timeout="5000"
            :multi-line="true"
          >
            <span :class="snackText">{{ text }}</span>
            <v-btn right :color="snackBtn" icon @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-snackbar>

          <v-form>
            <v-layout class="mt-12" row wrap justify-center>
              <v-flex class="px-5 mb-5" xs12 sm12 md12 lg12 xl12>
                <v-layout justify-center>
                  <input type="file" @change="uploadProfilePicture" />
                </v-layout>
              </v-flex>
              <v-flex class="px-5 mb-5" xs12 sm12 md12 lg12 xl12>
                <v-layout justify-center>
                  <v-avatar size="200" tile>
                    <v-img :src="user.picture"></v-img>
                  </v-avatar>
                </v-layout>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Username"
                  prepend-inner-icon="mdi-account-edit"
                  color="indigo darken-4"
                  v-model="profile.userName"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md6 lg12 xl12>
                <v-text-field
                  label="First Name"
                  prepend-inner-icon="mdi-account-edit"
                  color="indigo darken-4"
                  v-model="profile.firstName"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>

              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Last Name"
                  prepend-inner-icon="mdi-account-edit"
                  color="indigo darken-4"
                  v-model="profile.lastName"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  color="indigo darken-4"
                  v-model="profile.email"
                  type="email"
                  :rules="emailRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="Nationality"
                  prepend-inner-icon="mdi-globe-model"
                  color="indigo darken-4"
                  v-model="profile.nationality"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex class="px-5" xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  label="City"
                  prepend-inner-icon="mdi-home-city"
                  color="indigo darken-4"
                  v-model="profile.city"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../../firebaseConfig";
import moment from "moment";

export default {
  data: () => ({
    order: [],
    dialog1: false,
    dialog2: false,
    profile: {
      picture: null,
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      nationality: "",
      city: "",
      date: new Date().toISOString().substr(0, 10),
      createdAt: new Date().toISOString().substr(0, 10),
      authorId: fb.auth().currentUser.uid,
      month: moment().format("MMMM"),
      day: moment().format("dddd"),
      year: moment().format("YYYY")
    },
    snackbar: false,
    text: "",
    color: null,
    snackText: null,
    snackBtn: null,
    loading1: false,
    loading2: false,
    progressColor: null,
    loading3: false,
    loading4: false,

    inputRules: [
      v => !!v || "Field is required",
      v => v.length >= 1 || "Field must be more than 1 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],

    activeItem: null
  }),

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, {
        passive: true
      });
    }
  },

  firestore() {
    const user = fb.auth().currentUser.uid;
    return {
      profiles: db.collection("profiles"),
      order: db.collection("profiles").where("authorId", "==", user),
      todos: db.collection("todos"),
      orderTodos: db.collection("todos").where("author", "==", user)
    };
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {
      passive: true
    });
  },

  methods: {
    closeDialog2(){
      this.dialog2 = false;
      this.reset();
    },

    closeDialog1(){
      this.dialog1 = false;
      this.reset();
    },

    reset() {
      this.profile = {
        picture: null,
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        nationality: "",
        city: "",
      };
    },

    updateProfile(doc){
        this.$firestore.profiles.doc(doc[".key"]).set(this.profile)
        .then(docRef => {
            console.log(docRef);
            this.snackbar = true;
            this.text = "Profile Successfilly Updated !!!";
            this.color = "indigo accent-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
            this.loading3 = false;
            this.dialog2 = false;
          })
          .catch(error => {
            const errorMessage = error.message;
            console.log(error);
            this.snackbar = true;
            this.text = errorMessage;
            this.color = "red accent-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
            this.loading3 = false;
          });
    },

    openUpdateDialog(profile){
      console.log(profile[".key"]);
      this.dialog2 = true;
      this.profile = profile;
      this.activeItem = profile[".key"];
    },

    editProfile() {
      if (this.$refs.editProfileForm.validate()) {
        this.loading3 = true;
        this.$firestore.profiles
          .add(this.profile)
          .then(docRef => {
            console.log(docRef);
            this.snackbar = true;
            this.text = "Profile Successfilly Uploaded !!!";
            this.color = "indigo accent-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
            this.loading3 = false;
            this.dialog1 = false;
            this.reset();
          })
          .catch(error => {
            const errorMessage = error.message;
            console.log(error);
            this.snackbar = true;
            this.text = errorMessage;
            this.color = "red accent-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
            this.loading3 = false;
          });
      }
    },

    uploadProfilePicture(event) {
      this.loading1 = true;
      this.loading2 = true;
      let file = event.target.files[0];
      var storageRef = fb.storage().ref("profilePicturs/" + file.name);
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

          if (calc >= 0 && calc < 25) {
            this.progressColor = "red accent-4";
          }

          if (calc >= 25 && calc < 50) {
            this.progressColor = "orange accent-4";
          }

          if (calc >= 50 && calc < 75) {
            this.progressColor = "yellow accent-4";
          }

          if (calc >= 75 && calc < 90) {
            this.progressColor = "green lighten-4";
          }

          if (calc == 100) {
            this.snackbar = true;
            this.text = "Profile picture Upload Successfull !!!";
            this.color = "indigo accent-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
            this.progressColor = "green accent-4";
          }
        },
        error => {
          const errorMessage = error.message;
          this.snackbar = true;
          this.text = errorMessage;
          this.color = "red darken-4";
          this.snackText = "white--text";
          this.snackBtn = "white";
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(getDownloadURL => {
            // this.report.images.push(getDownloadURL);
            this.profile.picture = getDownloadURL;
            console.log("file available at", getDownloadURL);
            this.snackbar = true;
            this.text = "Profile picture is ready for useage !!!";
            this.color = "indigo accent-4";
            this.snackText = "white--text";
            this.snackBtn = "white";
            this.loading1 = false;
            this.loading2 = false;
          });
        }
      );
    },

    onResize() {
      this.isMobile = window.innerWidth < 600;
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("../../assets/animate.css");
.todo.completed {
  border-left: 4px solid #3cd1c2;
}
.todo.ongoing {
  border-left: 4px solid #ffaa2c;
}
.todo.overdue {
  border-left: 4px solid #f83e70;
}

.todo {
  .v-chip.completed {
    background: #3cd1c2;
  }
  .v-chip.ongoing {
    background: #ffaa2c;
  }
  .v-chip.overdue {
    background: #f83e70;
  }
}
</style>
