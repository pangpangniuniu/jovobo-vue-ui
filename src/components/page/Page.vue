<template>
  <div class="page-all">
    <ul>
      <li class="all-num">共{{totalPage}}页 / {{totalCount}}条数据</li>
      <li class="gopage" v-if='isJump && totalPage>0'>
        <span @click="getfarPage(goPage)" class="go-btn">跳转至</span>
        <input type="number" name="gopage" v-model='goPage' v-on:input="changePage()">
        <span>页</span>
      </li>
      <li v-if="childCurPage<totalPage && totalPage>0" @click="getNxt()">
        >
      </li>
      <li v-if="childCurPage<totalPage && totalPage>0" @click="getAssign(totalPage)">尾页</li>
      <li v-if="childCurPage+3<=totalPage && totalPage>0" @click="getAssign(childCurPage+3)">
        {{childCurPage+3}}
      </li>
      <li v-if="childCurPage+2<=totalPage && totalPage>0" @click="getAssign(childCurPage+2)">
        {{childCurPage+2}}
      </li>
      <!-- 当前页码+1 -->
      <li v-if="childCurPage+1<=totalPage && totalPage>0" @click="getAssign(childCurPage+1)">
        {{childCurPage+1}}
      </li>
      <!-- 当前页码 -->
      <li v-if="totalPage>0" class="cur-page">
        {{childCurPage}}
      </li>
      <!-- 当前页码-1 -->
      <li v-if="childCurPage>1 && totalPage>0" @click="getAssign(childCurPage-1)">
        {{childCurPage-1}}
      </li>
      <!-- 当前页码-2 -->
      <li v-if="childCurPage>2 && totalPage>0" @click="getAssign(childCurPage-2)">
        {{childCurPage-2}}
      </li>
      <!-- 当前页码-3 -->
      <li v-if="childCurPage>3 && totalPage>0" @click="getAssign(childCurPage-3)">
        {{childCurPage-3}}
      </li>
      <li v-if="totalPage>1 && childCurPage>1" @click="getAssign(1)">
        首页
      </li>
      </li>
      <li v-if="childCurPage>1 && totalPage>0" @click="getPre()">
        <
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/page.less";
</style>
<script>
  export default {
    name: 'ui-page',
    props: {
      'curPage': { 
        type: Number,
        default: 1
      },
      'totalCount': {
        type: Number,
        default: 0
      },
      'totalPage': {
        type: Number,
        default: 1
      },
      'isJump': {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        childCurPage: this.curPage,
        goPage: 1
      }
    },
    mounted () {
    },
    watch: {
      curPage: function (newVal, oldVal) {
        if (newVal !== undefined && newVal !== null && newVal.toString() === '1') {
          this.childCurPage = 1
        }
      }
    },
    methods: {
      getNxt () {
        this.childCurPage ++
        this.$emit('getPage', this.childCurPage)
      },
      getPre () {
        this.childCurPage --
        this.$emit('getPage', this.childCurPage)
      },
      getAssign (page) {
        this.childCurPage = page
        this.$emit('getPage', this.childCurPage)
      },
      getfarPage (page) {
        let pagenew = parseInt(page)
        if (pagenew < 1 && this.goPage !== '') {
          this.goPage = 1
        } else if (pagenew > this.totalPage) {
          this.goPage = this.totalPage
        } else {
          this.childCurPage = pagenew
          this.$emit('getPage', this.childCurPage)
        }
      },
      changePage () {
        if (this.goPage < 1 && this.goPage !== '') {
          this.goPage = 1
        } else if (this.goPage > this.totalPage) {
          this.goPage = this.totalPage
        }
      }
    }
  }
</script>