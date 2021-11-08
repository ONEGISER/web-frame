<template>
  <div class="home-container">
    <TDViewer></TDViewer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TDViewer from "../components/TDViewer/TDViewer.vue";
export default defineComponent({
  name: "Home",
  components: {
    TDViewer,
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
