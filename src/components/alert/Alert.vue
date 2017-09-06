<template>
  <transition name="alert">
    <div class="alert-all">
      <div class="alert-wraper">
        <p class="close-alert"></p>
        <p :class="[{fail: ifFail}, 'title']">{{title}}</p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'ui-alert',
    props: {
      title: {
        type: String,
        default () {
          return {}
        }
      },
      type: {
        type: String,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        ifFail: ''
      }
    },
    mounted () {
      if (this.type === 'fail') {
        this.ifFail = true
      } else {
        this.ifFail = false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/components/alert.less";
</style>
