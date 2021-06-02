import Vuex from "vuex";
import Vue from "vue";
import * as modules from "./module/export.js"
Vue.use(Vuex);
const store = new Vuex.Store({
	modules
})
export default store;
  