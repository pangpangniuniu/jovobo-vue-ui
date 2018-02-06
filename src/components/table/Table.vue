<template>
  <div class="table-all">
    <div class="refresh" @click="refresh()" v-if="showRefresh.value">
      <img :src="refreshImg" class="pos-abs">
      <!-- <span>刷新</span> -->
    </div>
    <div
      class="table" 
      :class="[autoScroll.need&&autoScroll.containHead?'scroll-bar maxHeight': '']">
      <ul 
        class="head"
        :style="getStyle('', 'headself')">
        <li 
          v-if="checkType.checkAll||checkType.checkSingle"
          style="width:50px;height:100%;">
          <div v-if="checkType.checkAll" class="check pos-abs">
            <label class="choose">
              <input type="checkbox" @click="toCheckAll()">
              <span 
                class="circle pos-abs" 
                :class="[hasCheckAll?'is-check-all':'']">
              </span>
              <span 
                v-if="hasCheckAll" 
                class="tick pos-abs">
                ✔
              </span>
            </label>
          </div>
        </li>
        <li 
          v-for="(item,index) in tableHead" 
          :style="'width:'+item.width">
          <p>
            {{item.name}}
          </p>
        </li>
      </ul>
      <ul
        v-if="!update&&tableData.length>0"
        class="body" 
        :class="[autoScroll.need&&!autoScroll.containHead?'scroll-bar maxHeight': '']"
        :style="getStyle('', 'bodyself')">
        <li 
          v-for="(item,index) in tableData" 
          :style="getStyle('', 'trself')"
          @dblclick="dblclick(index)">
          <div 
            v-if="checkType.checkAll||checkType.checkSingle" 
            class="check">
            <label class="choose">
              <input type="checkbox" @click="checkItem(item, index)">
              <span class="circle" :class="[item.check?'is-checked':'']"></span>
              <span v-if="item.check" class="tick pos-abs">✔</span>
            </label>
          </div>
          <div 
            v-for="(child,childIndex) in item.list" 
            :style="getStyle('width:' + tableHead[childIndex].width + ';', 'tdself')">
            <slot 
              v-if="child.freedom" 
              :name="'freedom_'+index">
            </slot>
            <slot 
              v-if="child.isTagIpt" 
              :name="'ipt_'+index">
            </slot>
            <span 
              v-if="!child.isTagA&&!child.isTagImg&&!child.freedom&&!child.isTagIpt" 
              :class="[child.color?child.color: '']"
              :style="getStyle('', 'span')">
              {{child.content}}
            </span>
            <img 
              v-if="child.isTagImg" 
              :src="child.content"
              :style="getStyle('', 'img')">
            <div v-if="child.isTagA" >
              <a
                v-for="(a,aIndex) in child.content" 
                :style="getStyle('color:' + a.color + ';', 'a')"
                @click.stop="operate(index,childIndex,aIndex)">
                {{a.name}}
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <p v-if="update" class="loading">
      <img :src="loadingImg">
      <span>加载中……</span>
    </p>
    <p v-if="!update&&tableData.length===0" class="no-data">未查到数据</p>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/table/table.less";
</style>
<script>
  export default{
    name: 'ui-table',
    props: {
      checkType: {
        type: Object,
        default () {
          return {
            checkSingle: false, // 是否需要选择按钮
            checkAll: false // 是否需要全选按钮
          }
        }
      },
      autoScroll: {
        type: Object,
        default () {
          return {
            need: false, // 是否需要上下滚动
            maxHeight: '100%', // 如果需要滚动的话，超过最大高度多少后开始滚动
            containHead: false // 如果滚动，滚动范围是否包含头部
          }
        }
      },
      showRefresh: {
        type: Object,
        default () {
          return {
            value: false
          }
        }
      },
      update: {
        type: Boolean,
        default: false
      },
      tableHead: {
        type: Array,
        default () {
          return []
        }
      },
      tableData: {
        type: Array,
        default () {
          return []
        }
      },
      extraStyle: {
        type: Object,
        default () {
          return {
            head: '',
            body: {
              self: '',
              tr: {
                self: '',
                td: {
                  self: '',
                  a: '',
                  img: '',
                  span: ''
                }
              }
            }
          }
        }
      }
    },
    data () {
      return {
        checkedIndexArr: [],
        hasCheckAll: false,
        maxHeight: 'max-height:' + this.autoScroll.maxHeight,
        loadingImg: 'data:image/gif;base64,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',
        refreshImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACG0lEQVRIS71WQVLbQBDsUaA4RvYHsA7yFX4Q8wL4QZIj0gH7BcgvMBxsX80P4AWIHyRXRJWVD6DNkYrRULti7ZUsWRKVYo/a2emZ6ZkeET7h0CdgoBGIPVnaOFgdWYSBDiplhHjZ+y1GjjADzWxfT/Hy5U7f7QSxp4/HFnABoh+VGTMvUmt/LM6dWNp0p09XIL5IgZHw3Cv5rRKkO40CEC61c2b8ASEGQ4Bgg9EjwuEmMx4Kv3/dmUUhAd/AGD/7blAJ0p09LgD6Lg0YeGBCIM7dsJiNPY8GxAiUU2XMCyZyakHsWTS0gIl8Y6a8q0HMN2u7qkzs+bJn8WrZCmAeDcBgAoYEnNWC6DLJEiWeu+6kqiw60+iWCKel91WZdGaRIOBrSjgp46DoTDYHy7Y2mkAGmNGjGuFXjnhJosW4l12U+G7vfw7puoU1eU1L1SaINYieC2bcJb67IbCNtwrbbZCGpLfB3pRLcwKOE6/vtHFSZ7sBmSxt62CVqBlp2F1bCvAupMJzVYfpk9MuY07CxHNP6iIs3mvdKgaZA8lNPPNP4fcXTYFMQU1pz9GqXCqQOe3KBuq6DqjwZiu4UqkvqHDIhPEOFb4k6GXGN89ef2v3tNknco8omVCHcUxyr2Tr4C8DgV5Sxcx3b0alyv8CvVuKj6VzAt+mtB+YHLQCMY2VtqVZWVJwDIviJiJaSnwdyR+5b/S38hHH5ps3pVMPKaa0H0oAAAAASUVORK5CYII='
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.hasCheckAll = false
        this.checkedIndexArr = []
        for (let i = 0; i < this.tableData.length; i++) {
          if (!this.tableData[i].check) {
            this.hasCheckAll = false
            break
          }
        }
      },
      getStyle (other, type) {
        let style = other
        switch (type) {
          case 'headself':
            if (this.extraStyle.head) {
              style += this.extraStyle.head
            }
            break
          case 'bodyself':
            if (this.extraStyle.body && this.extraStyle.body.self) {
              style += this.extraStyle.body.self
            }
            break
          case 'trself':
            if (this.extraStyle.body && this.extraStyle.body.tr && this.extraStyle.body.tr.self) {
              style += this.extraStyle.body.tr.self
            }
            break
          case 'tdself':
            if (this.extraStyle.body && this.extraStyle.body.tr && this.extraStyle.body.tr.td && this.extraStyle.body.tr.td.self) {
              style += this.extraStyle.body.tr.td.self
            }
            break
          case 'span':
            if (this.extraStyle.body && this.extraStyle.body.tr && this.extraStyle.body.tr.td && this.extraStyle.body.tr.td.span) {
              style += this.extraStyle.body.tr.td.span
            }
            break
          case 'a':
            if (this.extraStyle.body && this.extraStyle.body.tr && this.extraStyle.body.tr.td && this.extraStyle.body.tr.td.a) {
              style += this.extraStyle.body.tr.td.a
            }
            break
          case 'img':
            if (this.extraStyle.body && this.extraStyle.body.tr && this.extraStyle.body.tr.td && this.extraStyle.body.tr.td.img) {
              style += this.extraStyle.body.tr.td.img
            }
            break
        }
        return style
      },
      dblclick (index) {
        this.$emit('dblclick', index)
      },
      operate (trIndex, tdIndex, aIndex) {
        let item = {
          trIndex: trIndex,
          tdIndex: tdIndex,
          aIndex: aIndex
        }
        this.$emit('operate', item)
      },
      toCheckAll () {
        if (this.hasCheckAll) {
          this.hasCheckAll = false
          this.$emit('getCheckAll', false) // 告诉父组件全部取消全选
          this.checkedIndexArr = []
          for (let i = 0; i < this.tableData.length; i++) {
            this.$set(this.tableData[i], 'check', false)
            this.checkedIndexArr.splice(i.toString(), 1)
          }
        } else {
          this.hasCheckAll = true
          this.$emit('getCheckAll', true) // 告诉父组件全部全选
          this.checkedIndexArr = []
          for (let i = 0; i < this.tableData.length; i++) {
            this.$set(this.tableData[i], 'check', true)
            this.checkedIndexArr.push(i.toString())
          }
        }
        this.$emit('checkedIndexArr', this.checkedIndexArr)  // 告诉父组件已选中的下标数组
      },
      checkItem (item, index) {
        let operaItem = {
          index: index,
          check: ''
        }
        if (item.check) {
          item.check = false
          operaItem.check = false
          this.checkedIndexArr.splice(this.checkedIndexArr.indexOf(index.toString()).toString(), 1)
        } else {
          item.check = true
          operaItem.check = true
          this.checkedIndexArr.push(index.toString())
        }
        if (this.checkedIndexArr.length === this.tableData.length) {
          this.hasCheckAll = true
        } else {
          this.hasCheckAll = false
        }
        this.$emit('getThisOpera', operaItem) // 当前操作的对象
        this.$emit('checkedIndexArr', this.checkedIndexArr)
      },
      refresh () {
        this.init()
        this.$emit('refresh', '')
      }
    },
    watch: {
      'update': {
        handler: function (newVal) {
          if (newVal.value) {
            this.init()
          }
        },
        deep: true
      }
    }
  }
</script>