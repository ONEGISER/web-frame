<template>
    <Relation @click="click" :value="value" />

    <Relation @click="click" :value="value2" />

    ref:
    <!-- <RelationRef @click="click" :value="value" /> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Relation, { Data } from "./Relation.vue"
// import RelationRef from "./RelationRef.vue"


const value = ref<Data>({})
const value2 = ref<Data>({})

setTimeout(() => {
    const temp = {
        name: "刘德华",
        code: "ldh"
    }
    value.value = JSON.parse(JSON.stringify(temp))
    value2.value = temp
}, 3000)
const click = (datas: Data) => {
    console.log(datas);
}
</script>