/**vue3  antd table示例
 */
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { Table } from 'ant-design-vue';
defineProps<{ msg: string }>()

const count = ref(0)


const cutomCommonRender = (data: any) => {
    console.log(data);
    const { text, index, union } = data
    const obj = {
        children: text,
        props: { colSpan: data.record.union ? 0 : 1 },
    };
    return obj;
}

const columns = [
    {
        title: '序号',
        dataIndex: 'id',
    },
    {
        title: '名称',
        dataIndex: 'mc',
        customRender: (data: any) => {
            const { value } = data
            const obj = {
                children: value,
                props: { colSpan: data.record.colSpan },
            };
            return obj;
        },
    },
    {
        title: 'Cash Assets',
        dataIndex: 'money',
        customRender: cutomCommonRender
    },
    {
        title: 'Address',
        dataIndex: 'address',
        customRender: cutomCommonRender
    },

];

const data = [
    {
        type: "防护用品",
        mc: 'John Brown',
        money: '￥300,000.00',
        xm: "甲组",
        address: 'New York No. 1 Lake Park',
        colSpan: 3,
    },
    {
        type: "防护用品",
        mc: 'Jim Green',
        xm: "甲组",
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        type: "防护用品",
        mc: 'Joe Black',
        xm: "乙组",
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
    {
        type: "日常用品",
        mc: 'Joe Black2',
        xm: "乙组",
        money: '￥120,000.2222222',
        address: '22222 No. 1 Lake Park',
    },
    {
        type: "日常用品",
        mc: 'John Brown1',
        money: '￥300,000.00',
        xm: "甲组",
        address: 'New York No. 1 Lake Park',
    },
    {
        type: "日常用品",
        mc: 'John Brown2',
        money: '￥300,000.00',
        xm: "丙组",
        address: 'New York No. 1 Lake Park',
    },
];

//数字转中文数字
const toChinesNum = (num: number) => {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let unit = ["", "十", "百", "千", "万"];
    if (typeof (num) === "string") {
        num = parseInt(num);
    }
    let getWan = (temp: number) => {
        let strArr: any = temp.toString().split("").reverse();
        let newNum = "";
        for (let i = 0; i < strArr.length; i++) {
            newNum = (i === 0 && strArr[i] === 0 ? "" : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? "" : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum;
        }
        return newNum;
    }
    let overWan = Math.floor(num / 10000);
    let noWan: any = num % 10000;
    if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
    };
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};


const getDataSource = (datas: any) => {
    const keyStr = "type"
    const secondColName = "mc"
    const idStr = "id"
    const secondNum = 2
    const obj: { [key: string]: any } = {

    }
    for (let i in datas) {
        const value = datas[i][keyStr]
        if (!obj[value]) {
            obj[value] = []
        }
        //设置序号
        datas[i][idStr]= obj[value].length+1
        obj[value].push(datas[i])
    }

    let results: any[] = []
    let j = 0
    for (let i in obj) {
        obj[i][0].colSpan = obj[i].length - secondNum
        const temp: any = {
            union: true
        }
        j++
        //设置序号
        temp[idStr] = toChinesNum(j)
        temp[secondColName] = i
        obj[i].unshift(temp)
        results = results.concat(obj[i])
    }
    return results
}
const dataSource = getDataSource(data)

</script>

<template>
    <a-table :dataSource="dataSource" :columns="columns" />
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
