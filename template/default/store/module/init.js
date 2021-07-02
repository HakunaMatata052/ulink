const initStore = {
	namespaced: true,
	state: {
		initFinish:false,
		dotList:[2,1,1,1,1,1],
		// dotList:[2,2,2,2,2,2],
		// dotList:[0,2,2,2,1,1],
		// dotList:[0,0,0,0,0,2],
		// dotList:[0,2,2,2,2,2],
		headImg:null,
		nickname:null,
		openid:null,
	},
	getters: {},
	mutations: {
		setInitFinish(state,payload){
			state.initFinish = payload
		},
		setDotList(state,payload){
			state.dotList = payload
		},
		setHeadImg(state,payload){
			state.headImg = payload
		},
		setNickname(state,payload){
			state.nickname = payload
		},
		setOpenid(state,payload){
			state.openid = payload
		},
	},
	actions: {
	}
}
export default initStore
