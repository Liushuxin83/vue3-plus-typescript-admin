<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入搜索内容" v-model="addUserInput">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格视图 -->
      <el-table
        class="users-table"
        :data="usersListData"
        style="width: 100%"
        :border="true"
        :stripe="true"
      >
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 这里使用的是作用域插槽很有用的   接收当前作用域的数据!!!!!!!!-->
          <template v-slot="scope">
            <!-- {{scope.row.mg_state}} -->
            <!-- 把当前行的数据传递给change事件中 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              class="btns"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              class="btns"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                class="btns"
                @click="setRole(scope.row)"
              >
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页视图 -->
      <el-pagination
        @size-change="onPagesizeChange"
        @current-change="onCurrentpageChange"
        class="users-pagination"
        :current-page="params.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </el-card>
  </div>
  <add-user-dialog ref="addUserDialogRef" />
</template>
<script lang="ts">
import { ElMessage } from 'element-plus'
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  getCurrentInstance
} from 'vue'
import {
  getUsersList,
  updateUserState,
  deleteUser
} from '../../network/usersList'
import AddUserDialog from '../../views/users/AddUserDialog.vue'
export default defineComponent({
  components: {
    AddUserDialog
  },
  setup () {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      addUserInput: '',
      params: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 5
      },
      // 数据总条数
      pageTotal: null,
      // 用户列表
      usersListData: null
    })
    onMounted(() => {
      getUsersListData()
    })
    const getUsersListData = async () => {
      const { data } = await getUsersList(state.params)
      console.log(data)
      state.usersListData = data.data.users
      state.pageTotal = data.data.total
    }
    const onPagesizeChange = pagesize => {
      state.params.pagesize = pagesize
      state.params.pagenum = 1
      getUsersListData()
    }
    const onCurrentpageChange = currentpage => {
      state.params.pagenum = currentpage
      getUsersListData()
    }
    const addUserDialogRef = ref('')
    const addUser = () => {
      (addUserDialogRef.value as any).centerDialogVisible = true
    }
    const userStateChange = async row => {
      // console.log(row)
      const { data } = await updateUserState(row.id, row.mg_state)
      // console.log(data)
      if (data.meta.status === 200) {
        ElMessage.success({
          message: `${data.meta.msg}`,
          type: 'success'
        })
      } else {
        ElMessage.error('修改用户状态失败')
      }
    }
    const removeUserById = id => {
      // console.log(proxy)
      // deleteUser(id)
      const vueInstance = proxy as any
      vueInstance
        .$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          const { data } = await deleteUser(id)
          console.log(data)
          if (data.meta.status === 200) {
            vueInstance.$message({ type: 'success', message: '删除成功!' })
          } else if (data.meta.status === 400) {
            vueInstance.$message({
              type: 'warning',
              message: `${data.meta.msg}`
            })
          }
        })
        .catch(() => {
          // console.log(res)
          vueInstance.$message({ type: 'info', message: '已取消删除' })
        })
    }
    return {
      ...toRefs(state),
      onPagesizeChange,
      onCurrentpageChange,
      addUser,
      addUserDialogRef,
      userStateChange,
      removeUserById
    }
  }
})
</script>
<style lang="less" scoped>
.users {
  min-width: 1000px;
  .box-card {
    margin-top: 30px;
    .users-table {
      margin-top: 20px;
    }
    .users-pagination {
      margin-top: 30px;
    }
  }
}
</style>
