<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}222222222222222</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
