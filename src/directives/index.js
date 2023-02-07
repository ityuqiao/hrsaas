// 负责管理所有的自定义指令
export const imgerror = {
  inserted(dom, options) {
    // 图片加载失败时触发
    dom.src = dom.src || options.value
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
