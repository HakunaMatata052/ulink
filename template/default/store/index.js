import Vuex from "vuex"
import Vue from "vue"
import * as modules from "./module/export.js"
import config from '../utils/config'
Vue.use(Vuex);
const store = new Vuex.Store({
	modules,
	state: {
		userInfo: null,
		isLogin: false,
		throttleInit: true,
	},
	mutations: {
		setUserInfo(state, payload) {
			state.userInfo = payload
		},
		setLoginState(state, payload) {
			state.isLogin = payload
		},
		setThrottleInit(state, payload) {
			state.throttleInit = payload
		}
	},
	actions: {
		AppInit({
			commit,
			state,
		}, payload) {
			if (!state.throttleInit) return
			return new Promise((resolve, reject) => {
				// #ifdef H5
				ulink.LoginManager.checkLogin(userInfo => {
					console.log("已登录~", userInfo)
					commit('setUserInfo', userInfo)
					commit('setLoginState', true)
					commit('setThrottleInit', false)
					resolve()
				}, () => {
					if (ulink.isMobile()) {
						if (ulink.isQQApp()) {
							ulink.LoginManager.login()
							commit('setThrottleInit', false)
							resolve()
						} else if (ulink.isWxApp()) {
							uni.showToast({
								title: '请在手Q内打开',
								icon: 'none'
							})
							reject('wx')
							return
							var url = ulink.getQueryString('s_url')
							var code = ulink.getQueryString('code')
							if (code && url) {
								ulink.setCookie('wxcode', code, 86400, location.host, "/")
								location.href = url
							} else {
								ulink.LoginManager.loginByWx();
							}
							// commit('setThrottleInit', false)
							resolve()
						} else {
							// commit('setThrottleInit', false)
							reject('mobile')
						}
					} else {
						// commit('setThrottleInit', false)
						reject('pc')
					}
				})

				// #endif
				// #ifdef MP-WEIXIN
				const Ulink = requirePlugin('ulink-mini-sdk')
				Ulink.init({
					sAppId: config.sAppId, // Ulink 活动的 AppId
					iActId: config.iActId, // Ulink 活动 Id
					// apiRoute: 'https://ulink.game.qq.com/app/2486/91378a794fb266d1', // Ulink 活动的 api 路由
					apiRoute: config.routeUrl, //1.0.5
					sdkVersion: 2,
					game: config.game, // 游戏名
					wxAppId: config.wxAppId, // 微信小程序的 AppId
					wx, // wx对象必须传递
				})
				commit('setLoginState', true)
				commit('setThrottleInit', false)
				resolve()

				// #endif
			})
		}
	}
})
export default store;
