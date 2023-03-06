<template>
    <a-row>
        <span>名称: </span>
        <a-auto-complete style="width:200px" v-model:value="data.name" :options="nameOptions"
            @search="onSearch('name', $event)" @select="onSelect('name', $event)" />
        <span>编号: </span>
        <a-auto-complete style="width:200px" v-model:value="data.code" :options="codeOptions"
            @search="onSearch('code', $event)" @select="onSelect('code', $event)" />
        <a-button @click="onClick">提交</a-button>
       
    </a-row>
</template>
        
<script setup lang="ts">
import { reactive, defineProps, toRefs, ref, defineEmits } from "vue"
import { Data } from "./interface";

interface OptionData {
    value?: string
}

type SearchType = "name" | "code" | "all"



interface Props {
    datas: Data[]
    value: Data
}

interface Emits {
    (e: 'click', data: Data): void
}
const emit = defineEmits<Emits>()



const props = withDefaults(defineProps<Props>(), {
    datas: () => [{
        name: "张三",
        code: "1"
    }, {
        name: "李四",
        code: "2"
    }, {
        name: "李三",
        code: "3"
    }, {
        name: "王麻子",
        code: "4"
    }],
})

const { datas, value } = toRefs(props);


const data = ref(value)

const nameOptions = ref<OptionData[]>([])
const codeOptions = ref<OptionData[]>([])


const getOptions = (datas: Data[], type: SearchType, searchText: string) => {
    const _codeOptions: OptionData[] = []
    const _nameOptions: OptionData[] = []
    for (let i in datas) {
        const data = datas[i]
        if (data) {
            if (type === "all") {
                _codeOptions.push({ value: data.code })
                _nameOptions.push({ value: data.name })
            } else if (type === "name") {
                const { name } = data
                if (name && name.indexOf(searchText) > -1) {
                    _nameOptions.push({ value: data.name })
                }
            } else if (type === "code") {
                const { code } = data
                if (code && code.indexOf(searchText) > -1) {
                    _codeOptions.push({ value: data.code })
                }
            }
        }
        if (!searchText) {
            nameOptions.value = []
            codeOptions.value = []
        } else {
            nameOptions.value = _nameOptions
            codeOptions.value = _codeOptions
        }
    }
}


const onSearch = (type: SearchType, searchText: string) => {
    console.log(searchText);

    getOptions(props.datas, type, searchText)
}

const onSelect = (type: SearchType, value: string) => {
    if (type === "name") {
        data.value.name = value
        //查找对应的编码值
        const code = datas.value.find((data) => {
            return data.name === value
        })?.code
        if (code) {
            data.value.code = code
        }
    } else if (type === "code") {
        data.value.code = value
        //查找对应的编名称值
        const name = datas.value.find((data) => {
            return data.code === value
        })?.name
        if (name) {
            data.value.name = name
        }
    }
}

const onClick = () => {
    emit('click', data.value)
}
</script>
