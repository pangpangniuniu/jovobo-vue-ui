<template>
  <div class="tree">
    <transition-group name="list-complete" tag="ul" class="tree-ul">
      <li v-bind:key="treeData.name" class="list-complete-item">
        <tree-item
          :treeData="treeData"
          :father="treeData"
          @selectFather="selectFather"
          @selectItem="selectItem"
          @closetree="closeTree">
        </tree-item>
      </li>
    </transition-group>
  </div>
</template>
<script>
  import TreeItem from './TreeItem.vue'
  export default {
    name: 'ui-tree',
    props: {
      'treeData': {
        type: Object,
        default () {
          return {} // 参考APP.vue中的示例
        }
      }
    },
    components: {
      TreeItem
    },
    mounted () {
    },
    methods: {
      selectItem (data) {
        let item = {
          name: data.name,
          id: data.id
        }
        this.$emit('selectItem', item)
      },
      selectFather (data) {
        let father = {
          name: data.name,
          id: data.id
        }
        this.$emit('selectFather', father)
      },
      closeTree () {
        this.treeData.showChild = false
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/tree/tree.less";
</style>