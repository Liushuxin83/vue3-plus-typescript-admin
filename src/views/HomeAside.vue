<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      :uniqueOpened="true"
      :default-active="activePath"
    >
      <el-submenu :index="'' + item.id" v-for="item in menuList" :key="item.id">
        <template #title>
          <i :class="iconsObj[item.id]" class="icons-style"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          :index="'/' + itemSub.path"
          v-for="itemSub in item.children"
          :key="itemSub.id"
          @click="saveNavState('/' + itemSub.path)"
          >{{ itemSub.authName }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMenu } from '../network/asideMenu'
export default defineComponent({
  setup () {
    // 定义状态
    const state = reactive({
      menuList: null,
      // 定义字体图标对象,里面的数字为每个导航的id
      iconsObj: {
        125: 'iconfont icon-yonghuguanli',
        103: 'iconfont icon-quanxianguanli',
        101: 'iconfont icon-dingdanguanli-',
        102: 'iconfont icon-houtaishangpinguanli',
        145: 'iconfont icon-shujuguanli'
      },
      // 保存被激活的链接地址，链接高亮显示
      activePath: null,
      firstPage: null
    })
    onMounted(() => {
      getMenuList()
      if (state.firstPage) {
        useRouter().push('/home')
      } else {
        state.activePath = window.sessionStorage.getItem('activePath')
      }
    })
    const getMenuList = async () => {
      const { data } = await getMenu()
      console.log(data)
      if (data.meta.status === 200) {
        state.menuList = data.data
      }
    }
    const saveNavState = path => {
      // 解决点击高亮效果 把每次点击的导航菜单存起来
      // 以便于下次刷新页面获取（在created中取）保持页面状态
      window.sessionStorage.setItem('activePath', path)
      state.activePath = path
    }
    const route = useRoute()
    watchEffect(() => {
      if (route.path === '/home/welcome') {
        state.firstPage = '/home/welcome'
        state.activePath = ''
      }
      // console.log(route.path)
    })
    return {
      ...toRefs(state),
      saveNavState
    }
  }
})
</script>
<style lang="less" scoped>
.icons-style {
  margin-right: 10px;
}
.el-menu {
  /* 清除左侧导航漏出来的细线 */
  border-right: none !important;
}
</style>
