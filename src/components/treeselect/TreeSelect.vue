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
    </div>
    <div v-show="showOptions" class="options scroll-bar" :class="[exportOptions?'show-options':'hide-options']" :style="treeWidth">
      <ui-tree
        class="options-all"
        :class="[exportOptions?'show-options':'hide-options']"
        :treeData="treeData"
        @selectFather="selectFather"
        @selectItem="selectItem"
      ></ui-tree>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ui-tree-select',
    props: {
      'title': {
        type: String,
        default: ''
      },
      'treeData': {
        type: Object,
        default: {
          name: '',
          id: 0,
          isFolder: true,
          showChild: false,
          isTop: true,
          check: false,
          child: [
            {
              name: '',
              id: 0,
              check: false,
              showChild: false,
              isFolder: true,
              child: []
            }, {
              name: '',
              id: 0,
              check: false,
              isFolder: false
            }
          ]
        }
      },
      'selectedOption': {
        type: Object,
        default () {
          return {
            name: '',
            id: ''
          }
        }
      }
    },
    data () {
      return {
        exportOptions: false,
        showOptions: false,
        optionsStyle: '', // options的宽度
        choosedItem: this.selectedOption,
        treeWidth: ''
      }
    },
    mounted () {
      let allW = this.$refs.all.clientWidth
      if (this.title && this.title.length > 0) {
        let titleW = this.$refs.title.clientWidth
        this.optionsStyle = 'width:' + (allW - titleW - 10) + 'px; left:' + (titleW + 10) + 'px;'
        this.treeWidth = 'width:' + (allW - titleW - 10) + 'px;'
      } else {
        this.optionsStyle = 'width:' + allW + 'px;'
        this.treeWidth = 'width:' + allW + 'px;'
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
        this.choosedItem.id = ''
        this.$emit('change', this.choosedItem)
      },
      selectItem (data) {
        this.$set(this.choosedItem, 'name', data.name)
        this.choosedItem.id = data.id
        this.$emit('change', this.choosedItem)
        this.hideOption()
      },
      selectFather (data) {
        this.$emit('selectFather', data)
      }
    },
    watch: {
      'selectedOption': function (newVal) {
        this.$set(this.choosedItem, 'name', newVal.value)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/tree-select.less";
</style>