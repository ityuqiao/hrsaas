<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部提示 -->
      <pageTools>
        <template #before>
          <span>共{{ total }}条数据</span>
        </template>
        <template #after>
          <el-button
            type="success"
            size="small"
            @click="$router.push('/import')"
          >导入excel表格</el-button>
          <el-button
            type="danger"
            size="small"
            @click="exportData"
          >导出excel表格</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            :disabled="!checkPermission('add_staff')"
            @click="dialogVisible = true"
          >新增员工</el-button>
        </template>
      </pageTools>
      <!-- 二维码弹出层 -->
      <el-dialog title="二维码" :visible.sync="CodeDialog">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>

      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column
          label="序号"
          sortable=""
          type="index"
          width="200"
          fixed="left"
        />
        <el-table-column label="姓名" sortable="" prop="username" width="200" />
        <el-table-column label="头像" sortable="" width="200">
          <template slot-scope="{ row }">
            <img
              v-imgerror="imgDefault"
              :src="row.staffPhoto"
              alt=""
              style="
								border-radius: 50%;
								width: 100px;
								height: 100px;
								padding: 10px;
							"
              @click="showCode(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="工号"
          sortable=""
          prop="workNumber"
          width="200"
        />
        <el-table-column
          width="200"
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
          :formatter="formatterFormOfEmployment"
        />
        <el-table-column
          label="部门"
          sortable=""
          prop="departmentName"
          width="200"
        />
        <el-table-column
          label="入职时间"
          sortable=""
          prop="timeOfEntry"
          width="200"
        >
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="账户状态"
          sortable=""
          prop="enableState"
          width="200"
        >
          <template slot-scope="{ row }">
            <el-switch
              :value="row.enableState === 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
              />
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" sortable="" width="280">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
            >查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="showRoleDialog(row.id)">角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteStaff(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="height: 60px" align="middle">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          :current-page="page.page"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 弹出层 -->
    <addStaff :dialog-visible="dialogVisible" />
    <!-- 分配角色弹出层 -->
    <RoleDialog ref="role" :role-dialog-visible="roleDialogVisible" :user-id="userId" />
  </div>
</template>

<script>
import { getStaffList, deleteStaff } from '@/api/employees'
import RoleDialog from '@/views/employees/components/roleDialog.vue'
import employeesEnum from '@/api/constant/employees'
import addStaff from './components/addStaff.vue'
import { formatDate } from '@/api/filters'
import qrCode from 'qrcode'

export default {
  components: {
    addStaff,
    RoleDialog
  },
  data() {
    return {
      userId: '',
      roleDialogVisible: false,
      CodeDialog: false,
      imgDefault: require('@/assets/common/bigUserHeader.png'),
      dialogVisible: false,
      tableData: [],
      page: {
        page: 1,
        size: 10
      },
      total: 0,
      loading: false
    }
  },
  created() {
    this.getStaffList()
  },
  methods: {
    showRoleDialog(id) {
      this.roleDialogVisible = true
      this.$refs.role.getStaffDetailsInfo(id)
      this.userId = id
    },
    showCode(url) {
      if (url) {
        this.CodeDialog = true
        this.$nextTick(() => {
          qrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message('该用户暂未设置头像')
      }
    },
    async getStaffList() {
      this.loading = true
      const { total, rows } = await getStaffList(this.page)
      this.total = total
      // console.log(total)
      this.tableData = rows
      this.loading = false
    },
    changePage(currentPage) {
      this.page.page = currentPage
      this.getStaffList()
    },
    formatterFormOfEmployment(row, column, cellValue, index) {
      const obj = employeesEnum.hireType.find(
        (item) => item.id === Number(cellValue)
      )
      return obj ? obj.value : '未知'
    },
    async deleteStaff(id) {
      try {
        await this.$confirm('确定删除该员工吗')
        await deleteStaff(id)
        this.getStaffList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportData() {
      const headers = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      const { rows } = await getStaffList({ page: 1, size: this.total })
      const data = this.formatterjson(headers, rows)
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '表单',
          bookType: 'xlsx'
        })
      })
    },
    formatterjson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === 'timeOfEntry' ||
							headers[key] === 'correctionTime'
          ) {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const result = employeesEnum.hireType.find((obj) => {
              return obj.id === Number(item[headers[key]])
            })
            return result ? result.value : '未知'
          } else {
            return item[headers[key]]
          }
        })
      })
    }
  }
}
</script>

  <style>
</style>

