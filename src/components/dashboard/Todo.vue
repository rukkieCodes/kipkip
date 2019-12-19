<template>
  <v-container fluid>
    <v-snackbar
      :color="color"
      v-model="snackbar"
      top
      right
      :timeout="5000"
      :multi-line="multi_line"
    >
      <span :class="snackText">{{ text }}</span>
      <v-btn right :color="snackBtn" icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-layout class="ml-2" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h1 class="subheading grey--text text--darken-2 font-weight-light">
          Todos
        </h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <Dialog class="ml-3 mb-4" />
    </v-layout>

    <transition-group
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <v-card
        class="pa-0 ma-0"
        flat
        width="100%"
        tile
        v-for="todo in order"
        :key="todo.title"
        :class="`todo ${todo.state}`"
      >
        <v-card-text class="ma-0 my-2 pa-0 px-4 py-1">
          <v-layout class="my-0" row wrap>
            <v-flex xs1 sm1 md1 lg1 xl1>
              <v-btn
                class="ma-0 pa-0 mt-2"
                left
                @click="complete(todo)"
                x-small
                icon
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-flex>

            <v-flex class="pl-2" xs4 sm4 md4 lg6 xl6>
              <v-layout class="mt-1" row wrap>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <span>Task</span>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <span class="grey--text text--darken-2 body-2 ma-0 pa-0">{{
                todo.title
              }}</span>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex class="pl-2" xs3 sm3 md3 lg3 xl3>
              <v-layout class="mt-1" row wrap>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <span>Due Date</span>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <span class="grey--text text--darken-2 body-2 ma-0 pa-0">{{
                todo.date
              }}</span>
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
                :class="`${todo.state} white--text caption ma-0 pa-0 px-2 py-2`"
              >
                <span class="caption">{{ todo.state }}</span>
              </v-chip>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs1 sm1 md1 lg1 xl1>
              <v-btn class="ma-0 pa-0 mt-2" @click="deleteTodo(todo)" icon>
                <v-icon small class="red--text text--darken-5"
                  >mdi-trash-can</v-icon
                >
              </v-btn>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>
    </transition-group>
  </v-container>
</template>

<script>
import Dialog from "./Dialog";
import { db, fb } from "../../firebaseConfig";
export default {
  data: () => ({
    order: [],
    snackbar: false,
    text: "",
    color: null,
    snackText: null,
    snackBtn: null,
    top: null,
    right: null,
    multi_line: null,
    taskCompleted: null,
    alert: false,
    alertMessage: ""
  }),

  components: {
    Dialog
  },

  firestore() {
    const user = fb.auth().currentUser.uid;
    return {
      todos: db.collection("todos"),
      order: db.collection("todos").where("author", "==", user)
    };
  },

  methods: {
    complete(doc) {
      console.log(doc[".key"]);
      this.$firestore.todos
        .doc(doc[".key"])
        .update({
          state: "completed"
        })
        .then(() => {
          this.snackbar = true;
          this.color = "#3cd1c2";
          this.snackText = "white--text";
          this.text = "Congratulations, you have completed this task";
          this.snackBtn = "white";
        })
        .catch(error => {
          const errorMessage = error.message;
          this.snackbar = true;
          this.color = "red darken-5";
          this.snackText = "white--text";
          this.text = errorMessage;
          this.snackBtn = "white";
        });
    },

    deleteTodo(doc) {
      this.$firestore.todos
        .doc(doc[".key"])
        .delete()
        .then(() => {
          this.snackbar = true;
          this.color = "#3cd1c2";
          this.text = "Task Successfully Deleted";
          this.snackText = "white--text";
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

  created() {
    this.$firestore.todos
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          let docDate = doc.data().date; //document date

          let currentDate = new Date().toISOString().substr(0, 10); //current date

          if (docDate < currentDate) {
            //checks if document date is less than current date
            this.$firestore.todos
              .doc(doc.id)
              .update({
                state: "overdue"
              })
              .then(() => {
                this.snackbar = true;
                this.color = "#f83e70";
                this.snackText = "white--text";
                this.text = `${doc.data().title}: This Task is Overdue`;
                this.dialog = false;
                this.loading = false;
                this.snackBtn = "white";
                this.multi_line = true;
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
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

    console.log(fb.auth().currentUser.uid);
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
