import Vue from 'vue'
import Apps from './Apps.vue'

import uiAlert from './components/Alert'
import uiDialog from './components/Dialog'
import uiPage from './components/Page'
import uiInput from './components/Input'
import uiSelect from './components/Select'
import uiTree from './components/Tree'
import uiTreeSelect from './components/TreeSelect'
// import uiTableBasic from './components/TableBasic'
// import uiTableUp from './components/TableUp'
import uiTable from './components/Table'
import uiNavLeft from './components/NavLeft'

import './style/basic/clear.css'
import './style/basic/effect.css'

const jovoVueUI = {
  uiAlert,
  uiDialog,
  uiPage,
  uiInput,
  uiSelect,
  uiTree,
  uiTable,
  uiTreeSelect,
  // uiTableBasic,
  // uiTableUp,
  uiNavLeft
}

jovoVueUI.install = function (Vue, options) {
  Vue.component(uiAlert.name, uiAlert)
  Vue.component(uiDialog.name, uiDialog)
  Vue.component(uiPage.name, uiPage)
  Vue.component(uiInput.name, uiInput)
  Vue.component(uiSelect.name, uiSelect)
  Vue.component(uiTree.name, uiTree)
  Vue.component(uiTreeSelect.name, uiTreeSelect)
  Vue.component(uiTable.name, uiTable)
  // Vue.component(uiTableBasic.name, uiTableBasic)
  // Vue.component(uiTableUp.name, uiTableUp)
  Vue.component(uiNavLeft.name, uiNavLeft)
}

if (typeof window !== 'undefined' && window.Vue) { 
  window.Vue.use(jovoVueUI)
}

export default jovoVueUI

// 以下为跑项目的时候测试用
  
// Vue.component('ui-alert', uiAlert)
// Vue.component('ui-dialog', uiDialog)
// Vue.component('ui-page', uiPage)
// Vue.component('ui-input', uiInput)
// Vue.component('ui-tree', uiTree)
// Vue.component('ui-select', uiSelect)
// Vue.component('ui-tree-select', uiTreeSelect)
// Vue.component('ui-table', uiTable)
// Vue.component('ui-navleft', uiNavLeft)
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { Apps }
// })

  