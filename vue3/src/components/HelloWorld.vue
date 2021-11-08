<template>
  <div class="hello">
    <Children msg="欢迎使用vue"></Children>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Children from "./Children.vue";
export default defineComponent({
  name: "HelloWorld",
  components: {
    Children,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
