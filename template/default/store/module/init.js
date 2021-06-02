const initStore = {
	namespaced: true,
	state: {
		config:null,
	},
	getters: {},
	mutations: {
		config: (state, config) => {
			state.config = config
		}
	},
	actions: {
	}
}
export default initStore
