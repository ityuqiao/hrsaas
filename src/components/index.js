import pageTools from '@/components/pageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImage from '@/components/UploadImage'
import Print from 'vue-print-nb'
import checkPermission from '@/mixins/checkPermission'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
    Vue.use(Print)
    Vue.mixin(checkPermission)
  }
}
