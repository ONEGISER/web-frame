<template>
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>

<script lang="ts">
import {  Vue } from 'vue-class-component';
//  
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>