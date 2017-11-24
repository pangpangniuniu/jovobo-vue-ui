<template>
  <div class="left-all">
    <transition-group name="list-complete" tag="ul" v-if="navData.length>0">
      <li v-for="(father,fatherIndex) in navData" v-bind:key="father.title" class="list-complete-item">
        <div class="father">
          <p class="first-level" v-if="curRouter.name" :class="[curRouter.name.split('-')[0]===father.name?'father-check':'']" @click="clickFather(father,fatherIndex)">
            <span class="first-icon">
              <svg aria-hidden="true" v-if="father.icon.indexOf('#')===0">
                <use :xlink:href="''+father.icon+''"></use>
              </svg>
              <span v-if="father.icon.indexOf('&')===0" class="unicode">
                <slot :name="father.title"></slot>
              </span>
            </span>
            <span v-if="father.title">
              {{father.title}}
            </span>
            <span class="first-arrow">
              <svg aria-hidden="true" :class="[father.showAll?'trans': 'no-trans']">
                <use xlink:href="#icon-xuanxiangjiantouzhankai-copy"></use>
              </svg>
            </span>
          </p>
          <transition-group name="list-complete" tag="ul" v-if="father.child&&father.child.length>0&&father.showAll">
            <li v-for="(child,childIndex) in father.child" v-bind:key="father.title" class="list-complete-item">
              <router-link :to="child.href">
                <span></span>
                <p @click="clickChild(fatherIndex, child, childIndex)">{{child.title}}</p>
              </router-link>
            </li>
          </transition-group>
        </div>
      </li>
    </transition-group>
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
    mounted () {
      if (this.$route.name !== null) {
        this.curRouter = this.$route
        this.init()
      }
    },
    watch: {
      '$route': function () {
        if (!this.getRoute) {
          this.curRouter = this.$route
          this.init()
        } else {
          this.curRouter = this.$route
        }
      }
    },
    methods: {
      init () {
        console.log('初始化左侧导航成功')
        this.getRoute = true
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