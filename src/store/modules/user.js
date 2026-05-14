export default {
    namespaced: true,
    state: {
        userInfo :{
            token: '',
            userId: null
        }

    },
    mutations: {
        setUserInfo(state, obj) {
            state.userInfo.token = obj.token
            state.userInfo.userId = obj.userId
        }
    },
    actions: {
        
    },
    getters: {
       
    }

    
}