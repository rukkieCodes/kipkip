<template>
  <v-container fluid class="home pa-0">
    <v-layout row wrap>
      <Nav />
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-img
          src="../../assets/bg1.jpg"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="1"
          class="grey lighten-2"
          width="100%"
          height="100vh"
        ></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Nav from "./Nav";
export default {
  name: "home",
  components: {
    Nav
  }
};
</script>


<style lang="scss" scoped>
.home{
  overflow: hidden !important;
}
</style>