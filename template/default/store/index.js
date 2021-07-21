import Vuex from "vuex"
import Vue from "vue"
import * as modules from "./module/export.js"
import config from '../utils/config'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules,
	state: {
		userInfo: null,
		isLogin: false,
		throttleInit: true, // 初始化节流阀
		titleHeight: 0, // 标题栏高度
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
		},
		setTitleHeight(state, payload) {
			state.titleHeight = payload
		}
	},
	actions: {
		AppInit({
			commit,
			state,
		}, payload) {
			return new Promise((resolve, reject) => {
				if (!state.throttleInit) {
					resolve()
					return
				}
				// #ifdef H5
				if (ulink.isMobile() && !ulink.isWxApp() && !ulink.isQQApp()) {
					ulink.LoginManager.openLink()
				}
				ulink.LoginManager.checkLogin(userInfo => {
					console.log("已登录~", userInfo)
					commit('setUserInfo', userInfo)
					commit('setLoginState', true)
					commit('setThrottleInit', false)
					resolve()
				}, () => {
					if (ulink.isMobile()) {
						if (ulink.isQQApp()) {
							ulink.LoginManager.loginByPT()
							commit('setThrottleInit', false)
							resolve()
						} else if (ulink.isWxApp()) {
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
							commit('setThrottleInit', false)
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
					apiRoute: config.routeUrl,
					game: config.game, // 游戏名
					wxAppId: config.wxAppId, // 微信小程序的 AppId
					wx, // wx对象必须传递
				})
				resolve(666)
				commit('setLoginState', true)
				commit('setThrottleInit', false)

				// #endif
			})
		}
	}
})
export default store
