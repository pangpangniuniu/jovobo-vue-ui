<template>
  <div class="select-all" ref="all">
    <p class="title" v-if="title&&title.length>0" ref="title">{{title}}</p>
    <div class="options-wraper" :style="optionsStyle">
      <input type="" readonly="readonly" class="input" @click.stop="showOption()" :v-model="choosedItem">
      <p class="name" @click.stop="showOption()">
        <span v-if="choosedItem&&choosedItem.name&&choosedItem.name!==''">{{choosedItem.name}}</span>
        <span v-else class="promt">--请选择--</span>
        <span v-if="choosedItem&&choosedItem.name&&choosedItem.name.length>0" class="clear-choose" @click.stop="clearChoose()">×</span>
      </p>
      <div v-show="showOptions" class="options-all" :class="[exportOptions?'show-options':'hide-options']">
        <input class="search-ipt" v-model="filterKey" ref="search" placeholder="输入关键字搜索">
        <i class="search-icon"></i>
        <ul class="scroll-bar">
          <li v-for="(item, index) in filteredOptions" @click="chooseItem(item)">
            <p :data-val="item.value">{{item.name|capitalize}}</p>
          </li>
        </ul>
        <p class="no-data" v-if="filteredOptions.length===0">没有相关数据</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/select.less";
</style>
<script>
  export default {
    name: 'ui-select',
    props: ['title', 'options', 'selectedOption'],
    data () {
      return {
        exportOptions: false,
        showOptions: false,
        optionsStyle: '', // options的宽度
        filterKey: ''
      }
    },
    mounted () {
      let allW = this.$refs.all.clientWidth
      if (this.title && this.title.length > 0) {
        let titleW = this.$refs.title.clientWidth
        this.optionsStyle = 'width:' + (allW - titleW - 10) + 'px; right:0px;'
      } else {
        this.optionsStyle = 'width:' + allW + 'px;'
      }
      let that = this
      document.addEventListener('click', (e) => {
        if (!e.target.contains(that.$refs.search)) {
          that.exportOptions = false
          setTimeout(function () {
            that.showOptions = false
          }, 200)
        }
      })
    },
    computed: {
      hasTitle: function () {
        let hasTitle
        if (this.$slots.title === undefined) {
          hasTitle = false
        } else {
          hasTitle = true
        }
        return hasTitle
      },
      choosedItem: function () {
        return JSON.parse(JSON.stringify(this.selectedOption))
      },
      filteredOptions: function () {
        let filterKey = this.filterKey
        let data = this.options
        if (filterKey) {
          data = this.options.filter(function (item) {
            return item.name.indexOf(filterKey) > -1
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
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
      chooseItem (item) {
        this.$set(this.choosedItem, 'name', item.name)
        this.$set(this.choosedItem, 'value', item.value)
        this.$emit('change', item)
        this.hideOption()
      },
      clearChoose () {
        this.$set(this.choosedItem, 'name', '')
        this.$set(this.choosedItem, 'value', '')
        this.$emit('change', this.choosedItem)
      }
    }
  }
</script>