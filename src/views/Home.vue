<template>
  <!-- home布局容器 -->
  <el-container class="home-container">
    <el-header class="home-header">
      <span>Vue3+Typescript后台管理系统</span>
      <span>欢迎---{{ $store.state.userInfo.username }}</span>
    </el-header>
    <el-container>
      <el-aside width="200px" class="home-aside">Aside</el-aside>
      <el-container>
        <el-main class="home-main">Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // setup () {}
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
