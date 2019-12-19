<template>
  <v-container fluid>
    <v-layout class="ml-5 my-5" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <h1 class="subheading grey--text text--darken-2 font-weight-light">
          Dashboard
        </h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <!-- days -->
      <v-flex class="px-5" xs12 sm12 md4 lg4 xl4>
        <v-card class="mt-4 mx-auto" max-width="100%">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#5EB562"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels1"
              :auto-draw="true"
              :auto-draw-duration="5000"
              :auto-line-width="true"
              :value="value1"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Daiy Tasks</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >Uploaded 4 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- month -->
      <v-flex class="px-5" xs12 sm6 md4 lg4 xl4>
        <v-card class="mt-4 mx-auto" max-width="100%">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#f83e70"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels2"
              :value="value2"
              :auto-draw="true"
              :auto-draw-duration="5000"
              :auto-line-width="true"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Monthly Tasks</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >Uploaded 10 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- completed -->
      <v-flex class="px-5" xs12 sm6 md4 lg4 xl4>
        <v-card class="mt-4 mx-auto" max-width="100%">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#3cd1c2"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels3"
              :value="value3"
              :auto-draw="true"
              :auto-draw-duration="5000"
              :auto-line-width="true"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Completed Tasks</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >Uploaded 40 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    
    <v-layout class="mt-12" row wrap>
      <!-- For Total Tasks -->
      <v-flex class="px-5" xs12 xm6 md4 lg3 xl3>
        <v-card raised class="mt-4 mx-auto" max-width="100%">
          <v-layout row wrap>
            <v-flex xs4 sm4 md4 lg4 xl4>
              <v-sheet
                class="v-sheet--offset ml-10"
                color="grey darken-3"
                elevation="12"
                width="100%"
                height="100%"
                max-width="100%"
              >
                <v-card color="grey darken-3" flat width="100%" height="100%">
                  <v-card-text>
                    <div class="text-center">
                      <v-btn x-large icon class="white--text">
                        <v-icon x-large>mdi-summit</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-flex>

            <v-flex xs8 sm8 md8 lg8 xl8>
              <v-card-text>
                <div
                  class="mr-3 mt-n2 grey--text text--darken-2 text-right caption font-weight-normal"
                >
                  Total Tasks
                </div>
                <div
                  class="mr-3 grey--text text--darken-4 text-right headline font-weight-normal"
                >
                  {{ total }}
                </div>
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-layout class="mt-n8" row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
              <v-card-text>
                <v-divider class="my-2"></v-divider>
                <v-icon class="ml-6 mr-2" small>
                  mdi-clock-outline
                </v-icon>
                <span class="caption grey--text font-weight-light"
                  >Uploaded 1 minutes ago</span
                >
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- For completed Tasks -->
      <v-flex class="px-5" xs12 xm6 md4 lg3 xl3>
        <v-card raised class="mt-4 mx-auto" max-width="100%">
          <v-layout row wrap>
            <v-flex xs4 sm4 md4 lg4 xl4>
              <v-sheet
                class="v-sheet--offset ml-10"
                color="#3cd1c2"
                elevation="12"
                width="100%"
                height="100%"
                max-width="100%"
              >
                <v-card color="#3cd1c2" flat width="100%" height="100%">
                  <v-card-text>
                    <div class="text-center">
                      <v-btn x-large icon class="white--text">
                        <v-icon x-large>mdi-calendar-multiple-check</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-flex>

            <v-flex xs8 sm8 md8 lg8 xl8>
              <v-card-text>
                <div
                  class="mr-3 mt-n2 grey--text text--darken-2 text-right caption font-weight-normal"
                >
                  Completed Tasks
                </div>
                <div
                  class="mr-3 grey--text text--darken-4 text-right headline font-weight-normal"
                >
                  {{ completed }}
                </div>
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-layout class="mt-n8" row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
              <v-card-text>
                <v-divider class="my-2"></v-divider>
                <v-icon class="ml-6 mr-2" small>
                  mdi-clock-outline
                </v-icon>
                <span class="caption grey--text font-weight-light"
                  >Uploaded 40 minutes ago</span
                >
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- For ongoing Tasks -->
      <v-flex class="px-5" xs12 xm6 md4 lg3 xl3>
        <v-card raised class="mt-4 mx-auto" max-width="100%">
          <v-layout row wrap>
            <v-flex xs4 sm4 md4 lg4 xl4>
              <v-sheet
                class="v-sheet--offset ml-10"
                color="#3cd1c2"
                elevation="12"
                width="100%"
                height="100%"
                max-width="100%"
              >
                <v-card color="#ffaa2c" flat width="100%" height="100%">
                  <v-card-text>
                    <div class="text-center">
                      <v-btn x-large icon class="white--text">
                        <v-icon x-large>mdi-walk</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-flex>

            <v-flex xs8 sm8 md8 lg8 xl8>
              <v-card-text>
                <div
                  class="mr-3 mt-n2 grey--text text--darken-2 text-right caption font-weight-normal"
                >
                  Ongoing Tasks
                </div>
                <div
                  class="mr-3 grey--text text--darken-4 text-right headline font-weight-normal"
                >
                  {{ ongoing }}
                </div>
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-layout class="mt-n8" row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
              <v-card-text>
                <v-divider class="my-2"></v-divider>
                <v-icon class="ml-6 mr-2" small>
                  mdi-clock-outline
                </v-icon>
                <span class="caption grey--text font-weight-light"
                  >Uploaded 2 minutes ago</span
                >
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- For overdue Tasks -->
      <v-flex class="px-5" xs12 xm6 md4 lg3 xl3>
        <v-card raised class="mt-4 mx-auto" max-width="100%">
          <v-layout row wrap>
            <v-flex xs4 sm4 md4 lg4 xl4>
              <v-sheet
                class="v-sheet--offset ml-10"
                color="#f83e70"
                elevation="12"
                width="100%"
                height="100%"
                max-width="100%"
              >
                <v-card color="#f83e70" flat width="100%" height="100%">
                  <v-card-text>
                    <div class="text-center">
                      <v-btn x-large icon class="white--text">
                        <v-icon x-large>mdi-arrange-send-backward</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-flex>

            <v-flex xs8 sm8 md8 lg8 xl8>
              <v-card-text>
                <div
                  class="mr-3 mt-n2 grey--text text--darken-2 text-right caption font-weight-normal"
                >
                  Overdue Tasks
                </div>
                <div
                  class="mr-3 grey--text text--darken-4 text-right headline font-weight-normal"
                >
                  {{ overdue }}
                </div>
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-layout class="mt-n8" row wrap>
            <v-flex xs12 sm12 md12 lg12 xl12>
              <v-card-text>
                <v-divider class="my-2"></v-divider>
                <v-icon class="ml-6 mr-2" small>
                  mdi-clock-outline
                </v-icon>
                <span class="caption grey--text font-weight-light"
                  >Uploaded 10 minutes ago</span
                >
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db, fb } from "../../firebaseConfig";
export default {
  data: () => ({
    labels1: ["M", "T", "W", "T", "F", "S", "S"],
    value1: [200, 675, 410, 390, 310, 460, 250],
    labels2: [
      "Ja",
      "Fe",
      "Ma",
      "Ap",
      "Mai",
      "Ju",
      "Jul",
      "Au",
      "Se",
      "Oc",
      "No",
      "De"
    ],
    value2: [200, 675, 410, 390, 310, 460, 250, 200, 675, 410, 390, 310],
    labels3: ["M", "T", "W", "T", "F", "S", "S"],
    value3: [200, 675, 410, 390, 310, 460, 250],
    total: "0",
    completed: "0",
    ongoing: "0",
    overdue: "0"
  }),

  firestore() {
    const user = fb.auth().currentUser.uid;
    return {
      todos: db.collection("todos").where("author", "==", user)
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

    //For completed
    this.$firestore.todos
      .where("state", "==", "completed")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const length = querySnapshot.docs.length;
          console.log(length);
          this.completed = length;
        });
      })
      .catch(error => {
        console.log(error);
      });

    //For ongoing
    this.$firestore.todos
      .where("state", "==", "ongoing")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const length = querySnapshot.docs.length;
          console.log(length);
          this.ongoing = length;
        });
      })
      .catch(error => {
        console.log(error);
      });

    //For ongoing
    this.$firestore.todos
      .where("state", "==", "overdue")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const length = querySnapshot.docs.length;
          console.log(length);
          this.overdue = length;
        });
      })
      .catch(error => {
        console.log(error);
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
