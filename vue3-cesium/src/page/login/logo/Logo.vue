<template>
  <img alt="" :src="imgUrl" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imgUrl: String,
  },
  data() {
  },
  setup() {},
});
</script>
