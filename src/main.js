import Vue from 'vue'
import App from './App.vue'
import uiAlert from './components/Alert'
import uiDialog from './components/Dialog'

const jovoVueUI = {
  uiAlert,
  uiDialog
}

jovoVueUI.install = function (Vue, options) {
	Vue.component(uiAlert.name, uiAlert)
	Vue.component(uiDialog.name, uiDialog)
}
// const install = function (Vue, opts = {}) {
//   Object.keys(jovoVueUI).forEach((key) => {
//     Vue.component(key, jovoVueUI[key])
//   })
// }
if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(jovoVueUI)
}

export default jovoVueUI
	