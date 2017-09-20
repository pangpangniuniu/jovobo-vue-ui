<template>
  <div class="table-all">
    <table :class="[needBorder?'has-border': '']">
      <thead>
        <th v-if="needCheck" width="5%" class="check">
          <label class="choose">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll">
            <span class="circle" :class="[isCheckAll?'is-check-all':'']"></span>
            <span v-if="isCheckAll" class="tick pos-abs">✔</span>
          </label>
        </th>
        <th v-for="(item,index) in tableHead" :width="item.width">{{item.name}}</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tableData" @click="getIndex(index)">
          <!-- 需要全选的按钮 -->
          <td v-if="needCheck" class="check">
            <label class="choose">
              <input type="checkbox" @click="checkItem(item)">
              <span class="circle" :class="[item.check?'is-checked':'']"></span>
              <span v-if="item.check" class="tick pos-abs">✔</span>
            </label>
          </td>
          <td v-for="(child,childIndex) in item">
            <span v-if="!child.isTagA&&!child.isTagImg" :class="[child.color?child.color: '']">
              {{child.content}}
            </span>
            <img v-if="child.isTagImg" :src="child.content">
            <a v-if="child.isTagA" v-for="(a,aIndex) in child.content" :class="a.color" @click.stop="operate(index,childIndex,aIndex)">{{a.name}}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <img v-if="update===0||update" class="loading" src="../../assets/loading.gif">
    <p v-if="!update&&tableData.length===0" class="no-data">未查到数据</p>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/table.less";
</style>
<script>
  export default{
    name: 'ui-table',
    props: ['needBorder', 'needCheck', 'update', 'tableHead', 'tableData'],
    data () {
      return {
        isCheckAll: false,
        checkedNum: 0,
        checkedIndex: [],
        checkedAll: false
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
      checkAll () {
        if (this.checkedAll) {
          this.checkedAll = false
          this.checkedNum = 0
          this.checkedIndex = []
          for (let i = 0; i < this.tableData.length; i++) {
            this.$set(this.tableData[i], 'check', false)
            this.checkedIndex.splice(i.toString(), 1)
          }
        } else {
          this.checkedAll = true
          this.checkedIndex = []
          this.checkedNum = this.tableData.length
          for (let i = 0; i < this.tableData.length; i++) {
            this.$set(this.tableData[i], 'check', true)
            this.checkedIndex.push(i.toString())
          }
        }
        this.$emit('checkedIndex', this.checkedIndex)
      },
      checkItem (item) {
        if (item.check) {
          this.$set(item, 'check', false)
          this.checkedNum --
          for (let i = 0; i < this.checkedIndex.length; i++) {
            if (this.checkedIndex[i] === item.index.toString()) {
              this.checkedIndex.splice(i, 1)
              break
            }
          }
        } else {
          this.$set(item, 'check', true)
          this.checkedNum ++
          this.checkedIndex.push(item.index.toString())
        }
        if (this.checkedNum === this.tableData.length) {
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
        this.$emit('checkedIndex', this.checkedIndex)
      }
    },
    watch: {
      update: function (newVal) {
        if (newVal !== 0) {
          if (this.tableData.length > 0) {
            let i = 0
            this.tableData.forEach(function (item) {
              item.index = i
              i++
            })
          }
        }
      }
    }
  }
</script>