<template>
  <div class="todo">
    <Todo />
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "../components/dashboard/Todo";

export default {
  name: "todo",
  components: {
    Todo
  }
};
</script>
