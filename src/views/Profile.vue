<template>
  <div class="home">
    <Profile />
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from "../components/dashboard/Profile";

export default {
  name: "profile",
  components: {
    Profile
  }
};
</script>
