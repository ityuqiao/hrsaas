import pageTools from '@/components/pageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImage from '@/components/UploadImage'
import Print from 'vue-print-nb'
import checkPermission from '@/mixins/checkPermission'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import langSelect from './language'
import TagsView from './TagsView'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('langSelect', langSelect)
    Vue.component('TagsView', TagsView)
    Vue.use(Print)
    Vue.mixin(checkPermission)
  }
}
