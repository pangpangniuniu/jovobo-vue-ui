<template>
  <transition name="dialog">
    <div class="dialog-all">
      <div class="dialog-wraper">
        <p class="close-dialog">
          <i class="fa fa-times" aria-hidden="true" title="关闭" @click="no()"></i>
        </p>
        <p class="title">{{title}}</p>
        <div class="btns">
          <span class="yes" @click="yes()">是</span>
          <span class="no" @click="no()">否</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'ui-dialog',
    props: ['title'],
    methods: {
      yes () {
        this.$emit('chooseYes', '')
      },
      no () {
        this.$emit('chooseNo', '')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/components/dialog.less";
</style>
