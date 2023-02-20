<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <svg-icon icon-class="language" style="color:#fff;font-size:20px" />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="cn" :disabled="$i18n.locale === 'zh-CN'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="$i18n.locale === 'zh-EN'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import i18n from '@/lang'
import Cookies from 'js-cookie'

export default {
  methods: {
    handleCommand(command) {
      if (command === 'cn') {
        i18n.locale = 'zh-CN'
        this.$message.success('切换多语言成功')
      } else {
        i18n.locale = 'zh-EN'
        this.$message.success('The switch to multi-language succeeded')
      }
      Cookies.set('language', i18n.locale)
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
