<template>
    <a-row>
        <span>名称: </span>
        <a-auto-complete style="width:200px" v-model:value="data.name" :options="nameOptions" @search="onSearch" />
        <span>编号: </span>
    </a-row>
</template>
        
<script setup lang="ts">
import { reactive, defineProps, toRefs, ref, } from "vue"

interface OptionData {
    value?: string
}

interface Data {
    name?: string
    code?: string
}

interface Props {
    datas: Data[]
    default: any
}

const props = withDefaults(defineProps<Props>(), {
    datas: () => [{
        name: "张三",
        code: "1"
    }, {
        name: "李四",
        code: "2"
    }],
})

const { datas } = toRefs(props);

const data = reactive({ code: "2", name: "李四" })

const nameOptions = ref<OptionData[]>([])
const codeOptions = ref<OptionData[]>([])


const getOptions = (datas: Data[],searchText:string) => {
    const _codeOptions: OptionData[] = []
    const _nameOptions: OptionData[] = []
    for (let i in datas) {
        const data = datas[i]
        if (data) {
            _codeOptions.push({ value: data.code })
            _nameOptions.push({ value: data.name })
        }
        nameOptions.value = _nameOptions
        codeOptions.value = _codeOptions
    }
}
// getOptions(props.datas,'')


const onSearch = (searchText: string) => {
    console.log(searchText);


}
</script>
