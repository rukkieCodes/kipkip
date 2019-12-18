<template>
  <div>
    <v-app-bar flat max-width="100vw" :fixed="true" color="transparent" dark>
      <v-toolbar-title>
        <p class="time shadow" v-text="currentTime"></p>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
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
