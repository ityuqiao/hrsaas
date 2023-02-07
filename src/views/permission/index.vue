<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="end">
          <el-button type="primary" size="small" @click="addPermission(1, '0')">添加权限</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          row-key="id"
        >
          <el-table-column
            prop="name"
            label="名称"
            width="180"
          />
          <el-table-column
            prop="code"
            align="center"
            label="标识"
            width="180"
          />
          <el-table-column
            prop="description"
            align="center"
            label="描述"
          />
          <el-table-column
            prop="address"
            align="center"
            label="操作"
          >
            <template slot-scope="{ row }">
              <el-button v-if="row.type === 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
              <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
              <el-button type="text" @click="delPermission(row.id)">删除</el-button>
            </template></el-table-column>
        </el-table>
      </el-card>
      <!-- 弹出层 -->
      <el-dialog
        :title="title"
        :visible="dialogVisible"
        @close="cancelBtn"
      >
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="ruleForm.code" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="ruleForm.description" />
          </el-form-item>
          <el-form-item label="企业可见">
            <el-switch
              v-model="ruleForm.enVisible"
              active-text="可见"
              inactive-text="不可见"
              active-value="0"
              inactive-value="1"
            />
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-row type="flex" justify="center">
            <el-button size="small" @click="cancelBtn">取 消</el-button>
            <el-button type="primary" size="small" @click="OkBtn">确 定</el-button>
          </el-row>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, getPermissionDetail, updatePermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils'

export default {
  data() {
    return {
      tableData: [],
      ruleForm: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      dialogVisible: false
    }
  },
  computed: {
    title() {
      return this.ruleForm.id ? '编辑限权' : '添加限权'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.tableData = tranListToTreeData(await getPermissionList(), '0')
    },
    delPermission(id) {
      this.$confirm('确定删除该权限吗').then(() => {
        return delPermission(id)
      }).then(() => {
        this.$message.success('删除成功')
        this.getPermissionList()
      })
    },
    addPermission(type, pid) {
      this.ruleForm.type = type
      this.ruleForm.pid = pid
      this.dialogVisible = true
    },
    OkBtn() {
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          if (this.ruleForm.id) {
            await updatePermission(this.ruleForm)
            this.$message.success('编辑成功')
          } else {
            await addPermission(this.ruleForm)
            this.$message.success('添加成功')
          }
          this.getPermissionList()
          this.dialogVisible = false
        }
      })
      // console.log(11)
    },
    cancelBtn() {
      this.ruleForm = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    },
    async editPermission(id) {
      this.dialogVisible = true
      this.ruleForm = await getPermissionDetail(id)
    }
  }
}
</script>

  <style>

  </style>

