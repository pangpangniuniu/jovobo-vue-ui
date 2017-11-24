<template>
  <div class="table-all">
    <div :class="[needBorder?'has-border': '']" class="table">
      <ul class="head">
        <li v-if="needCheck" class="check">
          <label class="choose">
            <input type="checkbox" @click="checkAll()" v-model="isCheckAll">
            <span class="circle" :class="[isCheckAll?'is-check-all':'']"></span>
            <span v-if="isCheckAll" class="tick pos-abs">✔</span>
          </label>
        </li>
        <li v-for="(item,index) in tableHead" :style="{width:item.width}">{{item.name}}</li>
      </ul>
      <ul class="body scroll-bar">
        <li v-for="(item,index) in tableData" @dblclick="getIndex(index)">
          <!-- 需要全选的按钮 -->
          <div v-if="needCheck" class="check">
            <label class="choose">
              <input type="checkbox" @click="checkItem(item)">
              <span class="circle" :class="[item.check?'is-checked':'']"></span>
              <span v-if="item.check" class="tick pos-abs">✔</span>
            </label>
          </div>
          <div v-for="(child,childIndex) in item"  :style="{width:tableHead[childIndex].width}">
            <span v-if="!child.isTagA&&!child.isTagImg" :class="[child.color?child.color: '']">
              {{child.content}}
            </span>
            <img v-if="child.isTagImg" :src="child.content">
            <a v-if="child.isTagA" v-for="(a,aIndex) in child.content" :class="a.color" @click.stop="operate(index,childIndex,aIndex)">{{a.name}}</a>
            <div v-if="child.hover" class="hover">
              <p :class="child.hover[0].color">{{child.hover[0].content}}</p>
              <p :class="child.hover[1].color">{{child.hover[1].content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <p v-if="update===0||update" class="loading">
      <img :src="loadingImg">
      <span>加载中……</span>
    </p>
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
        checkedAll: false,
        loadingImg: './../../src/assets/loading.gif'
      }
    },
    mounted () {
    },
    methods: {
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