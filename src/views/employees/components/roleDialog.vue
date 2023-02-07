<template>
  <el-dialog
    title="分配角色"
    :visible="roleDialogVisible"
    @close="cancelBtn"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer">
      <el-row type="flex" justify="center">
        <el-button size="small" @click="cancelBtn">取 消</el-button>
        <el-button size="small" type="primary" @click="OkBtn">确 定</el-button>
      </el-row>
    </span>

  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getStaffDetailsInfo } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    roleDialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkList: [],
      list: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    async getStaffDetailsInfo(id) {
      const { roleIds } = await getStaffDetailsInfo(id)
      this.checkList = roleIds || this.checkList
    },
    cancelBtn() {
      this.checkList = []
      this.$parent.roleDialogVisible = false
    },
    async OkBtn() {
      await assignRoles({ id: this.userId, roleIds: this.checkList })
      this.$parent.roleDialogVisible = false
    }
  }
}
</script>

<style>

</style>
