/**vue3  antd table示例
 */
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { Table } from 'ant-design-vue';
defineProps<{ msg: string }>()

const count = ref(0)

const columns = [
  {
    title: '项目',
    dataIndex: 'xm',
    customRender: (data: any) => {
      console.log(data);
      const { value, index } = data
      const obj = {
        children: value,
        props: { rowSpan: data.record.rowSpan },
      };
      return obj;
    },
  },
  {
    title: '名称',
    dataIndex: 'mc',
  },
  {
    title: '其他',
    dataIndex: 'other',
    children: [{
      title: 'Cash Assets',
      dataIndex: 'money',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },]
  },

];

const data = [
  {
    key: '1',
    mc: 'John Brown',
    money: '￥300,000.00',
    xm: "甲组",
    address: 'New York No. 1 Lake Park',
    rowSpan: 3
  },

  {
    key: '2',
    mc: 'Jim Green',
    xm: "甲组",
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
    rowSpan: 0
  },
  {
    key: '3',
    mc: 'Joe Black',
    xm: "乙组",
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
    rowSpan: 2
  },
  {
    key: '4',
    mc: 'Joe Black2',
    xm: "乙组",
    money: '￥120,000.2222222',
    address: '22222 No. 1 Lake Park',
    rowSpan: 0
  },
  {
    key: '21',
    mc: 'John Brown1',
    money: '￥300,000.00',
    xm: "甲组",
    address: 'New York No. 1 Lake Park',
    rowSpan: 0
  },
  {
    key: '333',
    mc: 'John Brown2',
    money: '￥300,000.00',
    xm: "丙组",
    address: 'New York No. 1 Lake Park',
    rowSpan: 0
  },
];

const getDataSource = (datas: any) => {
  const keyStr="xm"
  const obj: { [key: string]: any } = {

  }
  for (let i in datas) {
    const value=datas[i][keyStr]
    if (!obj[value]) {
      obj[value] = []
    }
    //默认所有的行不合并
    datas[i].rowSpan = 0
    obj[value].push(datas[i])
  }

  let results: any[] = []
  for (let i in obj) {
    obj[i][0].rowSpan = obj[i].length
    results = results.concat(obj[i])
  }
  console.log(results);

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
