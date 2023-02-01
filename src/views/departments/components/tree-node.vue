<template>
  <el-row :class="{custom_tree_node: !treeNode.isTreeTop}" :gutter="20" style="height: 40px">
    <el-col :span="20">
      <i v-show="treeNode.isTreeTop" class="el-icon-s-management" />
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row :gutter="20">
        <el-col :span="12">{{ treeNode.manager }}</el-col>
        <el-col :span="12">
          <el-dropdown @command="operateDepart">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-show="!treeNode.isTreeTop" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-show="!treeNode.isTreeTop" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'

export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    }
  },
  methods: {
    operateDepart(command) {
      if (command === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (command === 'edit') {
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delDepartments(this.treeNode.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('updata')
        }).catch((error) => {
          return new Error(error)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon-s-management {
	font-size: 22px;
	vertical-align: middle;
	margin-right: 10px;
}
.custom_tree_node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
