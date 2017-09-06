<template>
  <div class="search-all">
    <p v-for="(item, index) in searchList" class="list">
      <span class="name">{{item.name}}：</span>
      <input v-if="item.label==='input'" v-model="item.model">
      <!-- <DatePicker  :date-label="item.label" v-if="item.label==='date'" type="date" placeholder="选择日期" style="width: 200px" v-model="item.model"></DatePicker> -->
    </p>
    <span class="btn-search"  @click="search()">搜索</span>
    <span class="clear-search" @click="clear()">清空条件</span>
    <span class="export-excel" @click="exportExcel()">导出</span>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/search.less";
</style>
<script>
  export default {
    name: 'ui-search',
    props: ['searchList'],
    data () {
      return {
        modelArr: []
      }
    },
    mounted () {},
    methods: {
      search () {
        this.$emit('search', this.searchList)
      },
      clear () {
        for (let i = 0; i < this.searchList.length; i++) {
          this.searchList[i].model = ''
        }
      },
      exportExcel () {}
    }
  }
</script>