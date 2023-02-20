<template>
  <div>
    <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
      <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px; margin-right: 10px;" @click="changeScreen" />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  methods: {
    changeScreen() {
      if (!screenfull.isEnabled) {
        return this.$message.warning('全屏功能不可以')
      }
      screenfull.toggle()
    }
  }
}
</script>

<style>

</style>
