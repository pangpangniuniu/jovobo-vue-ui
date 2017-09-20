# jovobo-vue-ui

> 因涉及版权，非江小白员工不得使用。

## Build Setup

``` bash
# install dependencies
npm install jovobo-vue-ui
# use dependencies
import jovoboVueUi from 'jovobo-vue-ui'
Vue.use(jovoboVueUi)
```

# 组件用法

```
1、弹框组件
  <ui-alert
     v-if="alertManager.show" 
    :type="alertManager.type"
    :title="alertManager.title">
  </ui-alert>
  data () {
    return {
      alertManager: {
        show: false, // 是否显示
        type: '', // 弹框的类型，包括success(成功，title为黑色)和fail(失败，title为红色)
        title: '' // 弹框的标题
      }
    }
  },
  methods: {
    alert (show, type, title, autoHide) {
      this.alertManager = {
        show: show,
        type: type,
        title: title
      }
      // 如果设置2s后自动消失
      if (autoHide === true) {
        setTimeout(function () {
          this.alertManager.show = false
        }, 2000)
      }
    },
    submit () {
      this.alert(true, 'success', '提交成功', true)
    }
  }
```

```
2、对话框组件
  <ui-dialog
    v-if="dialogManager.show" 
    :title="dialogManager.title" 
    @chooseYes="chooseYes" 
    @chooseNo="chooseNo">
  </ui-dialoger>
  data () {
    return {
      dialogManager: {
        show: false, // 是否显示
        title: '' // 对话框的标题
      }
    }
  },
  methods: {
    dialog (show, title) {
      this.dialogManager = {
        show: show,
        title: title
      }
    },
    submit () {
      this.dialog(true, '是否删除？')
    },
    // 点击对话框的'是'要执行的函数
    chooseYes () {
    },
    // 点击对话框的'否'要执行的函数
    chooseNo () {
      this.dialogManager.show = false
    }
  }
```

```
3、分页组件
  <ui-page
    :curPage="pageData.curPage"
    :totalCount="pageData.totalCount"
    :totalPage="pageData.totalPage"
    :toUpdata="pageData.toUpdata"
    @getPage="getPage">
  </ui-page>
  data () {
    return {
      pageData: {
        curPage: 1,
        totalCount: 0,
        totalPage: 0
      }
    }
  },
  methods: {
    getPage (page) {
      // 跳转到指定页面
    }
  }
```

```
4、表格组件
   <ui-table 
    :update="update"
    :needBorder="needBorder"
    :needCheck="needCheck"
    :tableHead="headList"
    :tableData="dataList"
    @getIndex="getIndex"
    @operate="operate"
    @checkedIndex="checkedIndex"
  >
  </ui-table>
  data () {
    return {
      update: 0 // loading，初始值为0，一请求新的数据，设置为true，请求数据结束，设置为false
      needBorder: false, // 是否需要边框
      needCheck: true, // 是否需要左侧选择操作
      headList: [{
        name: '订单号',
        field: 'ordersn',
        width: '30%'
      },
      {
        name: '下单时间',
        field: 'create_time',
        width: '30%'
      },
      {
        name: '客户名称',
        field: 'name',
        width: '20%'
      },
      dataList: [
        [{ // 每一个tr是一个数组，每一个td是一个对象
          content: '1234', // 普通字符串只传content，color可传可不传，color的值：red/blue/gray/orange/green
          color: 'red'
        }, {
          content: '2017-09-12 12:00:20'
        }, {
          isTagA: true, // 如果是<a>，那么isTagA必传，且为true,content传数组，color必传
          content: [{
            name: '查看',
            color: 'orange'
          }, {
            name: '下架',
            color: 'green'
          }]
        }, {
          isTagImg: true, // 如果是<img>，那么isTagImg必传，且为true,content传图片的src
          content: ''
        }]
      ]
    }
  },
  methods: {
    // 点击a标签后返回的数据
    operate (data) {
      console.log(data)
      // {trIndex: 0, tdIndex: 1, aIndex:0}
    },
    // 点击tr后返回的下标
    getIndex (data) {
      console.log(data)
      // 0
    },
    // 点击选择框后返回的下标集合
    getIndex (data) {
      console.log(data)
      // ['0','2','7']
    }
  }
```

```
5、搜索框组件——————正在完善……
  <ui-search 
    :searchList="searchList"
    @search="search">
  </ui-search>
```

```
6、左侧导航组件
  <ui-navleft 
    :navData="navData">
  </ui-navleft>
  data () {
    return {
      navData: [{
        title: '订单管理',
        name: 'order',
        icon: '#icon-pinglun',
        showAll: true, // 是否默认展开
        child: [{
          title: '全部订单',
          href: '/order/list/0'
        }, {
          title: '待审核',
          href: '/order/list/2'
        }, {
          title: '待包装',
          href: '/order/list/3'
        }]
      }, {
        title: '商品管理',
        href: '/goods/list',
        name: 'goods',
        showAll: false,
        icon: '#icon-pinglun'
      }]
    }
  }
  要结合vue-router使用，vue-router中的配置
  const routes = [
    {
      path: '/order',
      name: 'order',
      meta: {title: '订单'},
      component: Order,
      children: [{
        path: 'list/:status',
        name: 'order-list',
        meta: {title: '订单列表'},
        component: OrderList
      }, {
        path: 'detail/:id',
        name: 'order-detail',
        meta: {title: '订单详情'},
        component: OrderDetail
      }]
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
      children: [{
        path: 'list',
        name: 'goods-list',
        meta: {title: '商品列表'},
        component: GoodsList
      }, {
        path: 'addsort',
        name: 'goods-addsort',
        meta: {title: '添加商品分类'},
        component: AddSort
      }, {
        path: 'addgoods',
        name: 'goods-addgoods',
        meta: {title: '添加商品'},
        component: AddGoods
      }]
    }
  ]

