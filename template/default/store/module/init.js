const initStore = {
	namespaced: true,
	state: {
		userInfo:null,
	},
	getters: {},
	mutations: {
		setUserInfo: (state, userInfo) => {
			state.userInfo = userInfo
		}
	},
	actions: {
	}
}
export default initStore
