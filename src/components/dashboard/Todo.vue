<template>
  <v-container class="mt-12">
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

    <v-layout class="ml-2" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h1 class="subheading grey--text text--darken-2 font-weight-light">
          Todos
        </h1>
      </v-flex>
    </v-layout>

    <v-container class="my-5 mt-12">
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
          tile
          v-for="todo in order"
          :key="todo.title"
          :class="`todo ${todo.state}`"
        >
          <v-card-text class="ma-0 pa-0">
            <v-layout class="my-0" row wrap>
              <v-flex xs1 sm1 md1 lg1 xl1>
                <v-layout class="pl-6 pt-4" justify-start>
                  <v-btn left @click="complete(todo)" x-small icon>
                    <v-icon>mdi-alarm-light</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex class="pt-4" xs8 sm4 md4 lg4 xl4>
                <div class="grey--text text--darken-2">
                  {{ todo.title }}
                </div>
              </v-flex>
              <v-flex class="px-6 py-2 pt-4" xs3 sm3 md3 lg3 xl3>
                <div class="grey--text text--darken-2">
                  {{ todo.date }}
                </div>
              </v-flex>
              <v-flex xs1 sm1 md1 lg1 xl1>
                <v-chip small ripple :class="`${todo.state} white--text caption my-2`">{{ todo.state }}</v-chip>
              </v-flex>
              <v-flex class="pr-4 pt-2" xs2 sm2 md2 lg2 xl2>
                <v-layout justify-end>
                  <v-btn depressed @click="deleteTodo(todo)" icon>
                    <v-icon class="red--text">mdi-minus-circle</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </transition-group>
    </v-container>
  </v-container>
</template>

<script>
import Dialog from "./Dialog";
import { db } from "../../firebaseConfig";
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
    taskCompleted: null
  }),

  components: {
    Dialog
  },

  firestore() {
    return {
      todos: db.collection("todos"),
      order: db.collection("todos").orderBy("title")
    };
  },

  methods: {
    complete(doc) {
      console.log(doc[".key"]);
      this.$firestore.todos.doc(doc[".key"]).update({
        state: "completed"
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
          this.top = true;
          this.right = true;
          this.multi_line = false;
        })
        .catch(error => {
          const errorMessage = error.message;
          console.log(errorMessage);
          this.snackbar = true;
          this.color = "red darken-4";
          this.text = errorMessage;
          this.snackText = "white--text";
          this.right = true;
          this.top = true;
          this.dialog = false;
          this.loading = false;
          this.snackBtn = "white";
          this.multi_line = true;
        });
    }
  },

  created() {
    this.$firestore.todos
      .where("state", "==", "completed")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          console.log(doc.data());
          if (doc.data().state == "completed") {
            this.taskCompleted = true;
          }
          if (doc.data().state != "completed") {
            this.taskCompleted = false;
          }
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });
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

.todo{
  .v-chip.completed{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
}
</style>
