import axios from 'axios'
import store from '@/store'
import router from '@/router'

import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
const timeout = 3600000
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (checkTimeOut()) {
      store.dispatch('user/logOut')
      router.push('/login')
      return Promise.reject(new Error('请重新登录'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

function checkTimeOut() {
  const nowTime = Date.now()
  return nowTime - getTimeStamp() > timeout
}

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
