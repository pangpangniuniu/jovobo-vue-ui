<template>
  <div class="page-all">
    <ul>
      <li class="all-num">共{{totalPage}}页 / {{totalCount}}条数据</li>
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
      <li v-if="totalPage>0" @click="getAssign(1)">
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
    props: ['curPage', 'totalCount', 'totalPage', 'pageData'],
    data () {
      return {
        childCurPage: this.curPage
      }
    },
    mounted () {},
    watch: {
      curPage: function (newVal, oldVal) {
        if (newVal.toString() === '1') {
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
      }
    }
  }
</script>