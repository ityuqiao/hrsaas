<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="100px"
              style="margin-left: 400px; margin-top: 30px"
            >
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="ruleForm.username"
                  autocomplete="off"
                  style="width: 300px"
                />
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input
                  v-model="ruleForm.password2"
                  type="password"
                  autocomplete="off"
                  style="width: 300px"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveDetail">保存</el-button>
                <el-button @click="$router.back()">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="UserInfoComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="JobInfoComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { saveUserDetailById } from '@/api/employees'
import { getStaffDetailsInfo } from '@/api/user'
import MyUserInfo from './user-info.vue'
import JobInfo from './job-info.vue'

export default {
  components: {
    MyUserInfo, JobInfo
  },
  data() {
    return {
      UserInfoComponent: MyUserInfo,
      JobInfoComponent: JobInfo,
      userId: this.$route.params.id,
      activeName: 'first',
      ruleForm: {
        username: '',
        password2: ''
      },
      userInfo: {},
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password2: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码长度应为6-16位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getStaffDetailsInfo()
  },
  methods: {
    async getStaffDetailsInfo() {
      this.userInfo = await getStaffDetailsInfo(this.userId)
      this.ruleForm.username = this.userInfo.username
    },
    saveDetail() {
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          this.userInfo.password = this.ruleForm.password2
          this.userInfo.username = this.ruleForm.username
          await saveUserDetailById(this.userInfo)
          this.$message.success('保存成功')
          // this.getStaffDetailsInfo()
        }
      })
    }
  }
}
</script>

<style>
</style>

