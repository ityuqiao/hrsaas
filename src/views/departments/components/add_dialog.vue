<template>
  <el-dialog :title="title" :visible="dialogVisible" :before-close="cancelBtn">
    <el-form
      ref="daptForm"
      :model="FormData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="FormData.name" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="FormData.code" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select
          v-model="FormData.manager"
          placeholder="请选择"
          @focus="getStaffSimple"
        >
          <el-option
            v-for="item in staff"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="FormData.introduce"
          type="textarea"
          placeholder="1-300个字符"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelBtn">取 消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="comfireBtn"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  addDepartments,
  getDepartDetail,
  editDepartment
} from '@/api/departments'
import { getStaffSimple } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const isNameRepeat = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.FormData.id) {
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)
          .some((item) => item.name === value)
      } else {
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value)
      }
      isRepeat
        ? callback(new Error(`同级部门下已经存在[${value}]`))
        : callback()
    }
    const isCodeRepeat = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.FormData.id) {
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error(`部门编码[${value}]重复`)) : callback()
    }
    return {
      staff: null,
      FormData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '部门名称为1-50个字符',
            trigger: 'blur'
          },
          {
            validator: isNameRepeat,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '部门编码为1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: isCodeRepeat
          }
        ],
        manager: [
          {
            required: true,
            message: '请选择部门负责人',
            trigger: 'blur'
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 300,
            message: '部门介绍为1-300个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.FormData.id ? '编辑部门' : '添加子部门'
    }
  },
  methods: {
    async getStaffSimple() {
      this.staff = await getStaffSimple()
    },
    comfireBtn() {
      this.$refs.daptForm.validate(async(isOk) => {
        if (isOk) {
          if (this.FormData.id) {
            await editDepartment(this.FormData)
            this.$message.success('编辑成功')
          } else {
            await addDepartments({ ...this.FormData, pid: this.treeNode.id })
            this.$message.success('添加成功')
          }
          this.$emit('updata')
          this.cancelBtn()
        }
      })
    },
    cancelBtn() {
      this.FormData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('close')
      this.$refs.daptForm.resetFields()
    },
    async getDepartDetail(id) {
      this.FormData = await getDepartDetail(id)
    }
  }
}
</script>

<style>
</style>
