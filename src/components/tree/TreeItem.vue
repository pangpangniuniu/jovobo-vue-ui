<template>
  <div class="item-all list-complete-item" ref="tree">
    <div class="item-title" :class="{'is-top':treeData.isTop}">
      <span class="holder" @click.stop="toggle(treeData)">
        <img :src="folderSrc" class="folder-icon" v-if="treeData.isFolder">
      </span>
      <span class="name" :class="{'checked':treeData.check}" @click.prevent="selectItem(treeData, father)">{{treeData.name}}</span>
      <span v-if="treeData.isFolder" class="arrow" @click.stop="toggle(treeData)">
        <img :src="arrow" :class="[treeData.showChild?'trans': 'no-trans']">
      </span>
    </div>
    <transition-group name="list-complete" tag="ul" v-if="treeData.isFolder && treeData.showChild" class="item-list">
      <li class="item list-complete-item" v-for="(item,index) in treeData.child" v-bind:key="item.name">
        <tree-item
          :father="treeData"
          :treeData="item"
          @selectFather="selectFather"
          @selectItem="selectItem">
        </tree-item>
      </li>
    </transition-group>
  </div>
</template>
<script>
  export default {
    name: 'tree-item',
    props: ['treeData', 'father'],
    data () {
      return {
        // 引用图片的话，安装后图片位置会有问题，但是如果使用background-image的话，编译的base64是错误的，所以只能自己先把图片变异成base64
        folderSrc: '',
        folderOpen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNTYyMDIxYS03NWZhLTUyNDAtOTE4OC1hMWUwNjlhZGM2ZTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUQ5NTdCOTJCNEE2MTFFNzk4REU4QzhDRTJGMDUzODgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUQ5NTdCOTFCNEE2MTFFNzk4REU4QzhDRTJGMDUzODgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjNkZWJiODAtNzExZS1hYjRhLWFkM2YtYTk1YjRhMDI3MWNiIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OGMyZDlkZjktOTljNy0xMWU3LTg1NTMtY2IwOTIwNDczZjUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+E9ODogAAAQBJREFUeNrckb1KBDEUhb+bSYZ13fEHi7VR3FawsvAFfAd7m30MfQWt7ARbX0GsrSzsrLTYRvAPBt1ZZybXxBVRFBeZzg9uSE6455ITOT9sHQBboRJ+5lbQIxjtgg1HF0o/LqPSjxv1Jao18t0g87AT9Huh2ofqrV0kQYyLBnLnvV/wVWiWz95fCfre+zAzFmqMc0+2GA413vY2j8m6G5QvBb+wGpc0bfE4OOH6dBu7stylMz9Dlp7B8yX4monUCe2pGzprvVz0Yv0Ba+fIr8LzwnQxkw00pOLaML2UW8oyZFOFOBfHkf6FYoRRVZpgaMg/MZht0J/Fjxs0MMlfBRgA1rVMYxVuV5IAAAAASUVORK5CYII=',
        folderClose: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNTYyMDIxYS03NWZhLTUyNDAtOTE4OC1hMWUwNjlhZGM2ZTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjZBRThFOUNCNEE2MTFFN0FGQkRCMEVFNUJBN0M4QTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjZBRThFOUJCNEE2MTFFN0FGQkRCMEVFNUJBN0M4QTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjNkZWJiODAtNzExZS1hYjRhLWFkM2YtYTk1YjRhMDI3MWNiIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OGMyZDlkZjktOTljNy0xMWU3LTg1NTMtY2IwOTIwNDczZjUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+36s+6wAAALJJREFUeNpiPDuPfTYDA1M4AwgwMiCDb0wM/6d/+fqjUUlemEFKSZmB4ft3BnTAeHwmy38w6z+GHMOfv38Z2FiZbHU0FY9w8fExMPz+jWnAu72KL4C08P//mKb8+fOXhYeH6zYXL/cJsGZGFCcyAfFXxv9XTd6ADGDABkAa/v5jYPj1mwEXYGH48es/A/ngMxMDhWDUACoZQJEhjP/P6lGSDoAJifH/Yob/jAHkJiSAAAMAiWw0XS2SuvoAAAAASUVORK5CYII=',
        arrow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApUlEQVQ4T82SURHCMBBEdx1UAhKQUAesg4IDrKCAOsg5AAm1UgXHhJkwUHKEmf40v5n3kt07YuXhSh4bEEjqAAxmdvk3jqQdgENmKOlI8uruo5mdWhJJewA3kkwpdc8OJI0kh5bkHXb33symV4ktSQ3Oj39MIZJE8JegFucXXBUsJAagz4WVzMuSw0UqcQDMERz+oLwi6QzgntuOxruBVW5tXuv+ARGUbhG6KMMWAAAAAElFTkSuQmCC',
        lastCheckedItem: {
          check: false
        },
        fatherArr: [],
        curFather: ''
      }
    },
    mounted () {
      this.folderSrc = this.folderClose
      let that = this
      document.addEventListener('click', (e) => {
        if (!e.target.contains(that.$refs.tree)) {
          that.$emit('closetree')
        }
      })
    },
    methods: {
      toggle () {
        if (this.treeData.isFolder) {
          if (this.treeData.showChild) {
            this.treeData.showChild = false
            this.folderSrc = this.folderClose
          } else {
            this.treeData.showChild = true
            this.folderSrc = this.folderOpen
          }
        }
      },
      selectItem (item, father) {
        this.$delete(item, 'check')
        this.$set(item, 'check', true)
        if (this.lastCheckedItem.check) {
          this.lastCheckedItem.check = false
        }
        if (father !== undefined) {
          this.$emit('selectFather', father)
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
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/tree/item.less";
</style>