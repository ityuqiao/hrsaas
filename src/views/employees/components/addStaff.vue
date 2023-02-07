<template>
  <el-dialog
    title="添加员工"
    :visible="dialogVisible"
    @close="btnCancel"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入姓名"
          style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="ruleForm.mobile"
          placeholder="请输入手机号"
          style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="ruleForm.timeOfEntry"
          type="date"
          placeholder="选择日期"
          style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="ruleForm.formOfEmployment"
          placeholder="请选择"
          style="width: 50%"
        >
          <el-option
            v-for="item in employeesEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="ruleForm.workNumber"
          placeholder="请输入工号"
          style="width: 50%"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-cascader
          v-model="ruleForm.departmentName"
          v-loading="loading"
          style="width: 50%"
          :options="treeData"
          placeholder="请选择部门"
          :props="{ checkStrictly: true, label: 'name', value: 'name' }"
          clearable
          @focus="getDepartments"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="ruleForm.correctionTime"
          type="date"
          placeholder="选择日期"
          style="width: 50%"
        />
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <span>
        <el-button size="small" @click="btnCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确 定</el-button>
      </span>
    </el-row>
  </el-dialog>
</template>

<script>
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
import employeesEnum from '@/api/constant/employees'
import { addStaff } from '@/api/employees'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      employeesEnum,
      ruleForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 2, max: 4, message: '用户姓名为2-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      loading: false
    }
  },
  // watch: {
  //   departmenArray
  // },
  methods: {
    async getDepartments() {
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    btnOk() {
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          this.ruleForm.departmentName = this.ruleForm.departmentName[ this.ruleForm.departmentName.length - 1]
          await addStaff(this.ruleForm)
          this.$parent.getStaffList()
          this.$parent.dialogVisible = false
        }
      })
    },
    btnCancel() {
      this.$refs.ruleForm.resetFields()
      this.$parent.dialogVisible = false
    }
  }
}
</script>

<style>
</style>
