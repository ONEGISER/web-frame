<template>
  <div class="home-container">
    <TreeViewer></TreeViewer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TreeViewer from "../../components/TDViewer/TreeViewer.vue";
export default defineComponent({
  name: "Viewer",
  components: {
    TreeViewer,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
  width: 100%;
  height: 100%;
}
</style>