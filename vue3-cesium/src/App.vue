<template>
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
body {
  margin: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>