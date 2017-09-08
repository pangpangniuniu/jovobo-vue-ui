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
    :needBorder="tableData.needBorder"
    :needCheck="tableData.needCheck"
    :needOperate="tableData.needOperate"
    :operateList="tableData.operateList"
    :tableHead="tableData.headList"
    :tableData="tableData.dataList"
    @operate="operate">
  </ui-table>
	data () {
	  return {
	  	needBorder: false, // 是否需要边框
      needCheck: true, // 是否需要左侧选择操作
      needOperate: true, // 是否需要最后的显示详情、修改、删除操作
      operateList: {
        child: [true, false, false], // 分别代表是否需要显示详情、修改、删除
        width: '10%'
      },
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
				['123', '2017-02-10', '小张'],
				['124', '2017-02-11', '小王'],
				['125', '2017-02-12', '小李']
      ]
  	}
  },
  methods: {
  	operate (data) {
  		console.log(data)
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

