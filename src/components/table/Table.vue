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
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableData" @click="getIndex(index)">
          <!-- 需要全选的按钮 -->
          <td v-if="needCheck" class="check">
            <label class="choose">
              <input type="checkbox" @click="checkItem()">
              <span class="circle"></span>
            </label>
          </td>
          <td v-for="(child,childIndex) in item">
            <span v-if="!child.isTagA&&!child.isTagImg">
              {{child.content}}
            </span>
            <img v-if="child.isTagImg" :src="child.content">
            <a v-if="child.isTagA" v-for="(a,aIndex) in child.content" :class="a.color" @click.stop="operate(index,childIndex,aIndex)">{{a.name}}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="tableData.length===0" class="no-data">未查到数据</p>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/table.less";
</style>
<script>
  export default{
    name: 'ui-table',
    props: ['needBorder', 'needCheck', 'tableHead', 'tableData'],
    data () {
      return {
        isCheckAll: false
      }
    },
    mounted () {
    },
    methods: {
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
      getIndex (index) {
        this.$emit('getIndex', index)
      },
      operate (trIndex, tdIndex, aIndex) {
        let item = {
          trIndex: trIndex,
          tdIndex: tdIndex,
          aIndex: aIndex
        }
        this.$emit('operate', item)
      },
      checkAll () {},
      checkItem () {}
    }
  }
</script>