import Vue from 'vue'
import App from './App'
import store from "./store/index"
import mixin from './mixin/mixin'
import Ulink from './utils/UlinkMiniSDK'
import './common/style/common.less'
// #ifdef H5
// import Devtools from 'vue-vconsole-devtools'
// Devtools.initPlugin(new VConsole()); // 需要在创建Vue根实例前调用
// new VConsole()
// #endif
Vue.config.productionTip = false
// #ifdef H5
window.requirePlugin = Ulink
// #endif


Vue.mixin(mixin)
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
