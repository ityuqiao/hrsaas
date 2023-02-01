<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treeNode :tree-node="treeTop" @addDepts="addDept" />
        <!-- 树形结构 -->
        <el-tree
          :data="departs"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <treeNode
            slot-scope="{ data }"
            :tree-node="data"
            @updata="getDepartments"
            @addDepts="addDept"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹出框 -->
    <addDialog
      ref="addDialog"
      :dialog-visible="showDialog"
      :tree-node="node"
      @close="showDialog = false"
      @closeDialog="showDialog = false"
      @updata="getDepartments"
    />
  </div>
</template>

<script>
import treeNode from './components/tree-node.vue'
import { getDepartments } from '@/api/departments'
import addDialog from './components/add_dialog.vue'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    treeNode,
    addDialog
  },
  data() {
    return {
      treeTop: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人',
        id: '',
        isTreeTop: true
      },
      defaultProps: {
        label: 'name'
      },
      departs: [],
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = tranListToTreeData(result.depts, '')
    },
    handleNodeClick() {},
    addDept(treeNode) {
      this.showDialog = true
      this.node = treeNode
    },
    editDepts(treeNode) {
      this.node = treeNode
      this.showDialog = true
      this.$refs.addDialog.getDepartDetail(this.node.id)
    }
  }
}
</script>

  <style scoped lang="scss">
.tree-card {
	padding: 30px 140px;
	font-size: 14px;
}
</style>

