import Vuex from "vuex";
import Vue from "vue";
import * as modules from "./module/export.js"
Vue.use(Vuex);
const store = new Vuex.Store({
	modules,
	state:{
		userInfo:null
	},
	mutations:{
		setUserInfo(state,userInfo){
			state.userInfo = userInfo
		}
	}
})
export default store;
  