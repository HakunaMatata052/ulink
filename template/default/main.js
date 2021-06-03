import Vue from 'vue'
import App from './App'
import store from "./store/index"
import Ulink from './utils/UlinkMiniSDK'
import './common/style/common.less';
// #ifdef H5
import vConsole from 'vconsole'
new vConsole()
// #endif
Vue.config.productionTip = false
// #ifdef H5
window.requirePlugin = Ulink
// #endif

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
