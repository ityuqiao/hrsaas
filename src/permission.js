import store from './store'
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
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
