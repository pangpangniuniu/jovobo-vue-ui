<template>
  <li class="item-all">
    <div class="item-title" :class="{'is-top':treeData.isTop, 'checked':treeData.check}" @click="selectItem(treeData, father)">
      <span class="holder" @click.stop="toggle(treeData)">
        <img :src="folderSrc" class="folder-icon" v-if="treeData.isFolder">
      </span>
      <!-- 此处必须要有{{treeData.check}}，否则选中后不能正常渲染，鬼知道怎么回事 -->
      <span><span style="display:none;">{{treeData.check}}</span>{{treeData.name}}</span>
      <span v-if="treeData.isFolder" class="arrow" @click.stop="toggle(treeData)">
        <i class="iconfont" :class="[treeData.showChild?'trans': 'no-trans']">&#xe638;</i>
      </span>
    </div>
    <transition-group name="list-complete" tag="ul" v-if="treeData.isFolder && treeData.showChild" class="item-list">
      <tree-item
        class="item list-complete-item"
        v-for="(item,index) in treeData.child"
        v-bind:key="item.name"
        :father="treeData.name"
        :key="index"
        :treeData="item"
        @selectFather="selectFather"
        @selectItem="selectItem">
      </tree-item>
    </transition-group>
  </li>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/tree/item.less";
</style>
<script>
  export default {
    name: 'tree-item',
    props: ['treeData', 'father'],
    data () {
      return {
        folderSrc: './../../src/assets/folder-close.png',
        lastCheckedItem: {
          check: false
        },
        fatherArr: [],
        curFather: ''
      }
    },
    methods: {
      toggle () {
        if (this.treeData.isFolder) {
          if (this.treeData.showChild) {
            this.treeData.showChild = false
            this.folderSrc = './../../src/assets/folder-close.png'
          } else {
            this.treeData.showChild = true
            this.folderSrc = './../../src/assets/folder-open.png'
          }
        }
      },
      selectItem (item, fatherName) {
        if (this.lastCheckedItem.check) {
          this.lastCheckedItem.check = false
        }
        this.$set(item, 'check', true)
        if (fatherName !== undefined) {
          this.$emit('selectFather', fatherName)
        }
        this.$emit('selectItem', item)
        this.lastCheckedItem = item
      },
      selectFather (data) {
        this.$emit('selectFather', data)
      }
    }
  }
</script>