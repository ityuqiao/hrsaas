import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { getUserInfo, login, getStaffDetailsInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUseInfo(state, result) {
    state.userInfo = { ...result }
  },
  removeInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const staffDetails = await getStaffDetailsInfo(result.userId)
    context.commit('setUseInfo', { ...result, ...staffDetails })
    return result
  },
  logOut(context) {
    context.commit('removeToken')
    context.commit('removeInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
