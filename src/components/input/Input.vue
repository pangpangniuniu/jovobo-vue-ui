<template>
  <div class="input-all" ref="all" id="all">
    <!-- <span class="title" id="title" v-if="hasTitle">
      <slot name="title">
      </slot>
    </span> -->
    <p v-if="title&&title.length>0" ref="title" class="title">{{title}}</p>
    <input 
      type="text" 
      class="input"
      ref="input" 
      :value="thisVal"
      @input="handleInput"
      :placeholder="placeholder"
      :style="iptStyle">
    <span class="clear" v-if="thisVal&&thisVal.length>0" @click.stop="clearChoose()">×</span>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/input.less";
</style>
<script>
  export default {
    name: 'ui-input',
    props: ['title', 'value'],
    data () {
      return {
        placeholder: '',
        iptStyle: '',
        thisVal: this.value
      }
    },
    mounted () {
      this.placeholder = this.$refs.all.getAttribute('placeholder')
      let allW = this.$refs.all.clientWidth
      if (this.title && this.title.length > 0) {
        let titleW = this.$refs.title.clientWidth
        this.iptStyle = 'width:' + (allW - titleW - 10) + 'px; right:0px;'
      } else {
        this.iptStyle = 'width:' + allW + 'px;'
      }
    },
    computed: {
      hasTitle: function () {
        let hasTitle
        // console.log(this.$slots.title)
        if (this.$slots.title === undefined) {
          hasTitle = false
        } else {
          hasTitle = true
        }
        return hasTitle
      }
    },
    // watch: {
    //   'value': function (val, oldVal) {
    //     console.log('监听到变化', val)
    //     // this.thisVal = newVal
    //     // this.$refs.input.value = newVal
    //   }
    // },
    watch: {
      'value': function (newVal) {
        this.thisVal = newVal
        this.$refs.input.value = newVal
      }
    },
    methods: {
      handleInput (event) {
        this.thisVal = event.target.value
        this.$refs.input.value = event.target.value
        this.$emit('change', this.$refs.input.value)
      },
      clearChoose () {
        this.thisVal = ''
        this.$refs.input.value = ''
        this.$emit('change', '')
      }
    }
  }
</script>