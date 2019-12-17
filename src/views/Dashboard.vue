<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "../components/dashboard/Dashboard";

export default {
  name: "home",
  components: {
    Dashboard
  }
};
</script>
