<template>
  <transition name="dialog" v-if="dialogManager.show">
    <div class="dialog-all">
      <div class="dialog-wraper">
        <p class="close-dialog">
          <span class="close" @click="close()">×</span>
        </p>
        <p class="title">{{dialogManager.title}}</p>
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
    props: {
      'dialogManager': {
        type: Object,
        default () {
          return {
            show: false,
            title: ''
          }
        }
      }
    },
    methods: {
      yes () {
        this.$emit('chooseYes', '')
      },
      no () {
        this.$emit('chooseNo', '')
      },
      close () {
        this.dialogManager.show = false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/components/dialog.less";
</style>
