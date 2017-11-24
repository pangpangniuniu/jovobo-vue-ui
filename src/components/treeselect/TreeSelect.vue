<template>
  <div class="select-all" ref="all">
    <p class="title" v-if="title&&title.length>0" ref="title">{{title}}</p>
    <div class="options-wraper" :style="optionsStyle">
      <span class="input" @click.stop="showOption()"></span>
      <p class="name" @click.stop="showOption()">
        <span v-if="choosedItem.name&&choosedItem.name.length>0">{{choosedItem.name}}</span>
        <span v-else class="promt">--请选择--</span>
        <span v-if="choosedItem.name&&choosedItem.name.length>0"class="clear-choose" @click.stop="clearChoose()">×</span>
      </p>
      <div v-show="showOptions" class="options scroll-bar" :class="[exportOptions?'show-options':'hide-options']">
        <tree
          class="options-all"
          v-show="showOptions"
          :class="[exportOptions?'show-options':'hide-options']"
          :treeData="treeData"
          @selectFather="selectFather"
          @selectItem="selectItem"
        ></tree>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/tree-select.less";
</style>
<script>
  import Tree from '../tree/Tree.vue'
  export default {
    name: 'ui-treeselect',
    // selectedOption: {value: ''}
    props: ['title', 'treeData', 'selectedOption'],
    components: {
      Tree
    },
    data () {
      return {
        exportOptions: false,
        showOptions: false,
        optionsStyle: '', // options的宽度
        choosedItem: {
          name: this.selectedOption.value
        }
      }
    },
    mounted () {
      let allW = this.$refs.all.clientWidth
      if (this.title && this.title.length > 0) {
        let titleW = this.$refs.title.clientWidth
        this.optionsStyle = 'width:' + (allW - titleW - 10) + 'px; left:' + (titleW + 10) + 'px;'
      } else {
        this.optionsStyle = 'width:' + allW + 'px;'
      }
      let that = this
      document.addEventListener('click', (e) => {
        that.exportOptions = false
        setTimeout(function () {
          that.showOptions = false
        }, 200)
      })
    },
    methods: {
      showOption () {
        if (!this.showOptions) {
          this.exportOptions = true
          this.showOptions = true
        } else if (this.showOptions) {
          this.hideOption()
        }
      },
      hideOption () {
        this.exportOptions = false
        let that = this
        setTimeout(function () {
          that.showOptions = false
        }, 280)
      },
      clearChoose () {
        this.$set(this.choosedItem, 'name', '')
        this.$emit('change', this.choosedItem)
      },
      selectItem (data) {
        this.$set(this.choosedItem, 'name', data.name)
        this.$emit('change', this.choosedItem)
        this.hideOption()
      },
      selectFather (data) {
        this.$emit('selectFather', data)
      }
    },
    watch: {
      'selectedOption': function (newVal) {
        console.log('变化了', newVal)
        this.$set(this.choosedItem, 'name', newVal.value)
      }
    }
  }
</script>