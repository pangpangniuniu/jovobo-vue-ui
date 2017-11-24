<template>
  <div class="tree">
    <ul class="tree-ul">
      <tree-item
        :treeData="treeData"
        :father="treeData.name"
        @selectFather="selectFather"
        @selectItem="selectItem">
      </tree-item>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/tree/tree.less";
</style>
<script>
  import TreeItem from './Item.vue'
  export default {
    name: 'ui-tree',
    props: ['treeData'],
    components: {
      TreeItem
    },
    data () {
      return {
        // treeData: {
        //   name: '1',
        //   showChild: false,
        //   child: [
        //     {
        //       name: '1-1'
        //     },
        //     {
        //       name: '1-2',
        //       showChild: false,
        //       child: [
        //         {
        //           name: '1-2-1'
        //         }
        //       ]
        //     }
        //   ]
        // }
      }
    },
    methods: {
      selectItem (data) {
        this.$emit('selectItem', data)
      },
      selectFather (data) {
        this.$emit('selectFather', data)
      }
    }
  }
</script>