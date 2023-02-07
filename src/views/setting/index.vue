<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              class="addBtn"
              @click="dialogVisible = true"
            >新增角色</el-button>
          </el-row>
          <el-card>
            <el-table border :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button type="primary" size="small" @click="editPermission(row.id)">分配权限</el-button>
                  <el-button type="warning" size="small" @click="editRole(row.id)">修改</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="deleteRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              style="height: 60px"
              align="bottom"
            >
              <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                @current-change="changePage"
              />
            </el-row>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">
          <el-alert
            :closable="false"
            :show-icon="true"
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
          />
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="企业名称">
              <el-input v-model="formData.name" disabled style="width: 400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="address" disabled style="width: 400px" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input
                v-model="formData.companyPhone"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="formData.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="formData.remarks"
                disabled
                style="width: 400px"
                type="textarea"
                :rows="3"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      title="编辑角色"
      :visible="dialogVisible"
      @close="closeDialog"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button
              size="small"
              @click="closeDialog"
            >取 消</el-button>
            <el-button type="primary" size="small" @click="editRoleById">确 定</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <!-- 编辑角色权限弹出层 -->
    <el-dialog
      title="权限分配"
      :visible="dialogRoleVisible"
      @close="cancelPerBtn"
    >
      <el-tree
        ref="perTree"
        :data="options"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :check-strictly="true"
        :default-checked-keys="selected"
      />
      <span slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button size="small" @click="cancelPerBtn">取 消</el-button>
          <el-button type="primary" size="small" @click="isPerOk">确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, editRoleById, addRole, assignPermission } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { mapGetters } from 'vuex'
import { tranListToTreeData } from '@/utils'

export default {
  data() {
    return {
      roleId: null,
      defaultProps: {
        label: 'name'
      },
      selected: [],
      options: [],
      dialogRoleVisible: false,
      activeName: 'first',
      tableData: [],
      page: {
        page: 1,
        pagesize: 3,
        total: 0
      },
      formData: {},
      address: '湖南科技大学',
      error: null,
      dialogVisible: false,
      ruleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请填写名字',
            trigger: 'blur'
          },
          {
            max: 10,
            min: 1,
            trigger: 'blur',
            message: '字符长度在1-10之间'
          }
        ],
        description: [
          {
            required: true,
            message: '请填写描述',
            trigger: 'blur'
          },
          {
            max: 50,
            min: 1,
            trigger: 'blur',
            message: '字符长度在1-50之间'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async editPermission(id) {
      this.roleId = id
      this.getPermissionList()
      const { permIds } = await getRoleDetail(id)
      // console.log(permIds)
      this.selected = permIds
      this.dialogRoleVisible = true
    },
    async getPermissionList() {
      this.options = tranListToTreeData(await getPermissionList(), '0')
    },
    async isPerOk() {
      this.$refs.perTree.getCheckedKeys()
      await assignPermission({ id: this.roleId, permIds: this.$refs.perTree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.dialogRoleVisible = false
    },
    cancelPerBtn() {
      this.selected = []
      this.dialogRoleVisible = false
    },

    async getRoleList() {
      const result = await getRoleList(this.page)
      this.page.total = result.total
      this.tableData = result.rows
    },
    changePage(currentPage) {
      this.page.page = currentPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.userInfo.userInfo)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确定删除吗？')
        await deleteRole(id)
        this.getRoleList()
      } catch (error) {
        this.error = error
      }
    },
    async editRole(id) {
      this.ruleForm = await getRoleDetail(id)
      this.dialogVisible = true
    },
    editRoleById() {
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          if (this.ruleForm.id) {
            await editRoleById(this.ruleForm)
          } else {
            await addRole(this.ruleForm)
          }
          this.getRoleList()
          this.$message.success('操作成功')
          this.dialogVisible = false
        }
      })
    },
    closeDialog() {
      this.ruleForm = {
        name: '',
        description: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
    }
  }
}
</script>

  <style scoped lang="scss">
.addBtn {
	margin-bottom: 20px;
}
</style>

