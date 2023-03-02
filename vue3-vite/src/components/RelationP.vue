<template>
    <Relation @click="click" :value="value" />

    <Relation @click="click" :value="value2" />

    ref:
    <!-- <RelationRef @click="click" :value="value" /> -->
    <input accept=".pdf" @change="onChange" type="file"/>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Data } from "./interface";
import Relation from "./Relation.vue"
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

const onChange=(e:any)=>{
    console.log(e);
    
}
</script>