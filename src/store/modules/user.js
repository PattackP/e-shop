import { setUserInfo, getUserInfo, removeUserInfo } from '@/utils/localStorage'

export default {
    namespaced: true,
    state: {
        userInfo : getUserInfo()

    },
    mutations: {
        setUserInfo(state, obj) {
            state.userInfo.token = obj.token
            state.userInfo.userId = obj.userId
            setUserInfo(obj)
        }
    },
    actions: {
        
    },
    getters: {
       
    }

    
}