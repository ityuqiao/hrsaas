import store from './store'
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/404', '/login']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userInfo.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log(result)
        // 添加动态路由
        const routes = await store.dispatch('permission/filteRoutes', roles.menus)
        router.push({ path: '*', redirect: '/404', hidden: true })
        // console.log(routes)
        router.addRoutes(routes)
        // 注意这里要再次跳转
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  //   为了解决进度条不能关闭的问题
  nprogress.done()
})

// router.afterEach(() => {
//   nprogress.done()
// })
