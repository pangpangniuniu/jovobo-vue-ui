<template>
  <div class="left-all">
    <ul>
      <li v-for="(father,fatherIndex) in navData">
        <div class="father">
          <p class="first-level" v-if="curRouter.name" :class="[curRouter.name.split('-')[0]===father.name?'father-check':'']" @click="clickFather(father,fatherIndex)">
            <span class="first-icon">
              <svg aria-hidden="true">
                <use :xlink:href="''+father.icon+''"></use>
              </svg>
            </span>
            <span v-if="father.title">
              {{father.title}}
            </span>
            <span class="first-arrow">
              <svg aria-hidden="true" :class="{'check':father.showAll}">
                <use xlink:href="#icon-xuanxiangjiantouzhankai-copy"></use>
              </svg>
            </span>
          </p>
          <ul v-if="father.child&&father.child.length>0&&father.showAll">
            <li v-for="(child,childIndex) in father.child">
              <router-link :to="child.href">
                <span></span>
                <p @click="clickChild(fatherIndex, child, childIndex)">{{child.title}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  @import "../../style/basic/color.less";
  @import "../../style/components/navleft.less";
</style>
<script>
  export default {
    name: 'ui-navleft',
    props: ['navData'],
    data () {
      return {
        getRoute: false,
        curRouter: {}
      }
    },
    watch: {
      '$route': function () {
        if (!this.getRoute) {
          this.getRoute = true
          this.curRouter = this.$route
          this.init()
        } else {
          this.curRouter = this.$route
        }
      }
    },
    methods: {
      init () {
        console.log('初始化了')
        let father = ''
        if (this.curRouter.name) {
          father = this.curRouter.name.split('-')[0]
        }
        for (let i = 0; i < this.navData.length; i++) {
          if (this.navData[i].name === father) {
            this.navData[i].showAll = true
          } else {
            this.navData[i].showAll = false
          }
        }
      },
      // 点击父级
      clickFather (father, index) {
        if (!father.showAll) {
          if (father.child && father.child.length > 0) {
            father.showAll = true
            for (let i = 0; i < this.navData.length; i++) {
              if (i !== index) {
                this.navData[i].showAll = false
              }
            }
          } else {
            // 如果没展开且没有子级
            for (let i = 0; i < this.navData.length; i++) {
              if (i !== index) {
                this.navData[i].showAll = false
                if (this.navData[i].child && this.navData[i].child.length > 0) {
                }
              }
            }
            father.showAll = true
            this.$router.push(father.href)
          }
        } else {
          father.showAll = false
        }
      },
      // 点击子级目录处理check，给last赋值
      clickChild (fatherIndex, child, childIndex) {
        console.log('fatherIndex', fatherIndex)
        for (let i = 0; i < this.navData.length; i++) {
          if (i !== fatherIndex) {
            this.navData[i].showAll = false
          } else {
            this.navData[i].showAll = true
          }
        }
      }
    }
  }
</script>