import Vue from 'vue'
import App from './App.vue'
import uiAlert from './components/Alert'
import uiDialog from './components/Dialog'
import uiPage from './components/Page'
import uiSearch from './components/Search'
import uiTable from './components/Table'
import uiNavLeft from './components/NavLeft'

const jovoVueUI = {
  uiAlert,
  uiDialog,
  uiPage,
  uiSearch,
  uiTable,
  uiNavLeft
}

jovoVueUI.install = function (Vue, options) {
  Vue.component(uiAlert.name, uiAlert)
  Vue.component(uiDialog.name, uiDialog)
  Vue.component(uiPage.name, uiPage)
  Vue.component(uiSearch.name, uiSearch)
  Vue.component(uiTable.name, uiTable)
  Vue.component(uiNavLeft.name, uiNavLeft)
}

if (typeof window !== 'undefined' && window.Vue) { 
  window.Vue.use(jovoVueUI)
}

export default jovoVueUI
  