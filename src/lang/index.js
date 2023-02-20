import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementCn from 'element-ui/lib/locale/lang/zh-CN'
import elementEn from 'element-ui/lib/locale/lang/en'
import Cookies from 'js-cookie'
import myCn from './cn'
import myEn from './en'
Vue.use(VueI18n)

export default new VueI18n({
  locale: Cookies.get('language') || 'zh-CN', // 语言标识
  messages: {
    'zh-CN': {
      ...elementCn,
      ...myCn
    }, // 中文语言包
    'zh-EN': {
      ...elementEn,
      ...myEn
    } // 英文语言包
  }
})

