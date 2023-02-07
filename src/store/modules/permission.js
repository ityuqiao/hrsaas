import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRouter(state, newRouter) {
    state.routes = [...constantRoutes, ...newRouter]
  }
}
const actions = {
  filteRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRouter', routes)
    return routes // 用于添加路由
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
