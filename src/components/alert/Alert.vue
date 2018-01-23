<template>
  <transition name="alert" v-if="alertData.show">
    <div class="alert-all">
      <div class="alert-wraper">
        <p class="top">
          <span class="close-alert" @click="close()">×</span>
        </p>
        <p :class="[{fail: ifFail}, 'title']">{{alertData.title}}</p>
      </div>
    </div>
  </transition>
</template>
<style lang="less" scoped>
  @import "../../style/components/alert.less";
</style>
<script>
  export default {
    name: 'ui-alert',
    props: {
      'autoHide': { // 自动关闭
        type: Boolean,
        default: true
      },
      'delayTime': { // 2000ms后自动关闭
        type: Number,
        default: 2000
      },
      'alertData': {
        type: Object,
        default () {
          return {
            show: false, // 是否显示
            type: 'success', // 弹框的类型，包括success(成功，title为黑色)和fail(失败，title为红色)
            title: '' // 弹框的标题
          }
        }
      }
    },
    data () {
      return {
        ifFail: ''
      }
    },
    mounted () {
      if (this.alertData.type === 'fail') {
        this.ifFail = true
      } else {
        this.ifFail = false
      }
    },
    watch: {
      'alertData': {
        handler: function () {
          if (this.alertData.show) {
            if (this.autoHide) {
              let delayTime = this.delayTime
              let that = this
              setTimeout(function () {
                that.alertData.show = false
              }, delayTime)
            }
          }
        },
        deep: true
      }
    },
    methods: {
      close () {
        this.alertData.show = false
      }
    }
  }
</script>
