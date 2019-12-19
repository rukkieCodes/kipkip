<template>
  <nav>
    <v-app-bar class="pt-3" flat max-width="100vw" :fixed="true" color="white" dark>
      <v-toolbar-title>
        <p class="display-1 font-weight-thin grey--text" v-text="currentTime"></p>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </nav>
</template>

<script>
import moment from "moment";
export default {
  name: "nav",

  data: () => ({
    currentTime: null
  }),

  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format("LTS");
    }
  },

  created() {
    this.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>
