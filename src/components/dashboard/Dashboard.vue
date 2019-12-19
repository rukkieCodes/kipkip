<template>
  <v-container class="ma-0 pa-0" fluid>
    <Nav />
    <router-view />
  </v-container>
</template>

<script>
import Nav from "./Nav";
export default {
  components: {
    Nav
  }
};
</script>
