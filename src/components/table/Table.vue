<template>
  <div class="table-all">
    <table :class="[needBorder?'has-border': '']">
      <thead>
        <th v-if="needCheck" width="5%" class="check">
          <label class="choose">
            <input type="checkbox" v-model="isCheckAll" @click="checkAll()">
            <span class="circle"></span>
          </label>
        </th>
        <th v-for="(item,index) in tableHead" :width="item.width">{{item.name}}</th>
        <th v-if="needOperate" width="5%">操作</th>
      </thead>
      <tbody>
        <tr v-for="(item1,index1) in tableData">
          <td v-if="needCheck" class="check">
            <label class="choose">
              <input type="checkbox" @click="checkItem()">
              <span class="circle"></span>
            </label>
          </td>
          <td v-for="(item2,index2) in item1">{{item2}}</td>
          <td v-if="needOperate" :width="operateList.width" class="operate">
            <span v-if="operateList.child[0]" @click="toDetail(index1)" class="detail">详情</span>
            <span v-if="operateList.child[1]" @click="toModify(index1)"  class="modify">修改</span>
            <span v-if="operateList.child[2]" @click="toDel(index1)"  class="del">删除</span>
          </td>
        </tr>
        <tr>
          <td v-if="tableData.length===0" :colspan="colspan" class="no-data">未查到数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="less" scoped>
  @import "../../../static/style/components/table.less";
</style>
<script>
  export default{
    name: 'table',
    props: ['needBorder', 'needCheck', 'needOperate', 'operateList', 'tableHead', 'tableData'],
    data () {
      return {
        isCheckAll: false,
        colspan: this.tableHead.length
      }
    },
    mounted () {
      if (this.needCheck) {
        this.colspan ++
      }
      if (this.needOperate) {
        this.colspan ++
      }
    },
    watch: {
      'tableData': function () {
      }
    },
    methods: {
      // 点击"详情"
      toDetail (index) {
        let item = {
          type: 'detail',
          index: index
        }
        this.$emit('operate', item)
      },
      toModify (index) {
        let item = {
          type: 'modify',
          index: index
        }
        this.$emit('operate', item)
      },
      toDel (index) {
        let item = {
          type: 'del',
          index: index
        }
        this.$emit('operate', item)
      },
      checkAll () {},
      checkItem () {}
    }
  }
</script>