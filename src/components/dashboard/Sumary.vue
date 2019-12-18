<template>
  <v-container class="mt-12">
    <v-layout class="ml-5" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h1 class="subheading grey--text text--darken-2 font-weight-light">
          Dashboard
        </h1>
      </v-flex>
    </v-layout>

    <v-layout class="mt-12" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card class="mt-4 mx-auto" max-width="94%">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#9652ff"
            elevation="5"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
              :smooth="true"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Your Statistics</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >last task completion: 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-12 px-12" justify-space-around row wrap>
      <v-flex class="mt-5" xs6 sm4 md4 lg3 xl3>
        <v-progress-circular
          :rotate="-90"
          :size="80"
          :width="10"
          :value="total"
          color="grey darken-3"
        >
          {{ total }}
        </v-progress-circular>
      </v-flex>

      <v-flex class="mt-5" xs6 sm4 md4 lg3 xl3>
        <v-progress-circular
          :rotate="-90"
          :size="80"
          :width="10"
          :value="ongoing"
          color="#ffaa2c"
        >
          {{ ongoing }}
        </v-progress-circular>
      </v-flex>

      <v-flex class="mt-5" xs6 sm4 md4 lg3 xl3>
        <v-progress-circular
          :rotate="-90"
          :size="80"
          :width="10"
          :value="completed"
          color="#3cd1c2"
        >
          {{ completed }}
        </v-progress-circular>
      </v-flex>

      <v-flex class="mt-5" xs6 sm4 md4 lg3 xl3>
        <v-progress-circular
          :rotate="-90"
          :size="80"
          :width="10"
          :value="overdue"
          color="#f83e70"
        >
          {{ overdue }}
        </v-progress-circular>
        <!-- <span class="caption grey--text text--darken-3"
          >Overdue: {{ overdue }}</span
        >
        <v-progress-linear
          color="#f83e70"
          height="12"
          :value="overdue"
        ></v-progress-linear> -->
      </v-flex>
    </v-layout>

    <v-layout class="ml-5 mt-12" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h1 class="subheading grey--text text--darken-2 font-weight-light">
          Sumary
        </h1>
      </v-flex>
    </v-layout>

    <v-layout class="mt-2" justify-space-around row wrap>
      <v-flex class="my-5 px-8" xs12 sm12 md12 lg12 xl12>
        <v-card class="ma-0 pa-5" color="grey darken-3" dark max-width="100%">
          <v-card-title>
            <span class="title font-weight-light">Total Tasks Listed</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            Your total tasks listed are ({{ total }})
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-row align="center" justify="end">
                <v-btn to="/dashboard/todo" fab>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex class="my-5 px-8" xs12 sm6 md4 lg4 xl3>
        <v-card class="mx-auto" color="#ffaa2c" dark max-width="400">
          <v-card-title>
            <span class="title font-weight-light">Total Ongoing Tasks</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            Your total ongoing tasks listed are ({{ ongoing }})
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-row align="center" justify="end">
                <v-btn small to="/dashboard/todo" fab>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex class="my-5 px-8" xs12 sm6 md4 lg4 xl3>
        <v-card class="mx-auto" color="#3cd1c2" dark max-width="400">
          <v-card-title>
            <span class="title font-weight-light">Total Completed Tasks</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            Your total completed tasks listed are ({{ completed }})
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-row align="center" justify="end">
                <v-btn small to="/dashboard/todo" fab>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex class="my-5 px-8" xs12 sm6 md4 lg4 xl3>
        <v-card class="mx-auto" color="#f83e70" dark max-width="400">
          <v-card-title>
            <span class="title font-weight-light">Total Overdue Tasks</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            Your total overdue tasks listed are ({{ overdue }})
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-row align="center" justify="end">
                <v-btn small to="/dashboard/todo" fab>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../../firebaseConfig";
export default {
  data: () => ({
    labels: ["ongoing", "completed", "overdue"],
    value: [],
    total: "0",
    completed: "0",
    ongoing: "0",
    overdue: "0"
  }),

  firestore() {
    return {
      todos: db.collection("todos")
    };
  },

  created() {
    this.$firestore.todos.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(querySnapshot.docs.length);
        this.total = querySnapshot.docs.length;
      });
    });

    this.$firestore.todos
      .where("state", "==", "ongoing")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(querySnapshot.docs.length);
          this.ongoing = querySnapshot.docs.length;
          this.value.push(querySnapshot.docs.length)[0];
        });
      });

    this.$firestore.todos
      .where("state", "==", "completed")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(querySnapshot.docs.length);
          this.completed = querySnapshot.docs.length;
          this.value.push(querySnapshot.docs.length)[1];
        });
      });

    this.$firestore.todos
      .where("state", "==", "overdue")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log(querySnapshot.docs.length);
          this.overdue = querySnapshot.docs.length;
          this.value.push(querySnapshot.docs.length)[2];
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
