<template>
  <!-- home布局容器 -->
  <el-container class="home-container">
    <el-header class="home-header">
      <span>Vue3+Typescript后台管理系统</span>
      <span>
        欢迎---{{ userInfoUsername }}
        <el-button class="quit-login" @click="onQuitLogin">退出登录</el-button>
      </span>
    </el-header>
    <el-container>
      <el-aside width="200px" class="home-aside">
        <home-aside></home-aside>
      </el-aside>
      <el-container>
        <el-main class="home-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import HomeAside from '../views/HomeAside.vue'
export default defineComponent({
  components: {
    HomeAside
  },
  setup () {
    const router = useRouter()
    const userInfoUsername = ref(
      window.localStorage.getItem('userInfoUsername')
    )
    const onQuitLogin = () => {
      // console.log(111)
      router.push('/login')
      window.localStorage.removeItem('userInfoToken')
      window.localStorage.removeItem('userInfoUsername')
      window.sessionStorage.removeItem('activePath')
    }
    return {
      userInfoUsername,
      onQuitLogin
    }
  }
})
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  .home-header {
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    font-size: 30px;
    color: #fff;
    line-height: 60px;
  }
  .home-aside {
    background-color: #333744;
  }
  .home-main {
    background-color: #eaedf1;
  }
}
</style>
