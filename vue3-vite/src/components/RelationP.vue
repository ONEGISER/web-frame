<template>
    <Relation @click="click" />
</template>

<script lang="ts" setup>
import Relation, { Data } from "./Relation.vue"
const click = (datas:Data) => {
    console.log(datas);
}
</script>