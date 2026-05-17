const userInfoIndex = 'userInfo'
const searchHistoryIndex = 'searchHistory'

const setSearchHistory = (searchHistory) => {
    localStorage.setItem(searchHistoryIndex, JSON.stringify(searchHistory))
}

const getSearchHistory = () => {
    const searchHistory = localStorage.getItem(searchHistoryIndex)
   return searchHistory ? JSON.parse(searchHistory) : []
}


const setUserInfo = (userInfo) => {
    localStorage.setItem(userInfoIndex, JSON.stringify(userInfo))
}

const getUserInfo = () => {
    const userInfo = localStorage.getItem(userInfoIndex)
   return userInfo ? JSON.parse(userInfo) : {}
}

const removeUserInfo = () => {
    localStorage.removeItem(userInfoIndex)
}

export {
    setUserInfo,
    getUserInfo,
    removeUserInfo,
    setSearchHistory,
    getSearchHistory
}