<template>
  <v-row>
    <v-snackbar
      :color="color"
      v-model="snackbar"
      top
      :timeout="5000"
      :multi-line="multi_line"
    >
      <span :class="snackText">{{ text }}</span>
      <v-btn right :color="snackBtn" icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ on }">
        <v-btn
          tile
          class="text-capitalize"
          depressed
          color="#3cd1c2"
          dark
          v-on="on"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          <span>add new task</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Add a New Task</v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12>
                <v-text-field
                  color="#3cd1c2"
                  :clearable="true"
                  v-model="todo.title"
                  label="Task"
                  prepend-inner-icon="mdi-bookmark-check"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12 lg12 xl12>
                <v-menu
                  v-model="todo.menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="todo.date"
                      label="Picker without buttons"
                      prepend-inner-icon="mdi-calendar"
                      color="#3cd1c2"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="todo.date"
                    header-color="#3cd1c2"
                    @input="todo.menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn
              :loading="loading"
              class="text-capitalize white--text"
              color="#9652ff"
              fab
              @click="submit"
              small
            >
              <v-icon class="white--text">mdi-plus</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { fb, db } from "../../firebaseConfig";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    menu: false,
    todo: {
      title: null,
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      createdAt: new Date().toISOString().substr(0, 10),
      author: fb.auth().currentUser.uid,
      state: "ongoing",
      month: moment().format("MMMM"),
      day: moment().format("dddd"),
      year: moment().format("YYYY")
    },
    snackbar: false,
    text: "",
    color: null,
    snackText: null,
    snackBtn: null,
    top: null,
    right: null,
    loading: false,
    multi_line: null,
  }),

  firestore() {
    return {
      todos: db.collection("todos")
    };
  },

  methods: {
    submit() {
      this.loading = true;
      this.$firestore.todos
        .add(this.todo)
        .then(docRef => {
          console.log(docRef);
          this.snackbar = true;
          this.color = "#3cd1c2";
          this.text = "Task Successfuly Added";
          this.snackText = "white--text";
          this.dialog = false;
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
          this.dialog = false;
          this.loading = false;
          this.snackBtn = "white";
          this.multi_line = true;
        });
    }
  },
};
</script>
