<template>
  <div class="loginColor">
    <div class="login-bg">
      <el-radio-group v-model="selectRadio" @change="loginRadioChange">
        <el-radio-button
          v-for="item in loginState"
          :label="item.id"
          :key="item.id"
          >{{ item.text }}</el-radio-button
        >
      </el-radio-group>
    </div>
    <!-- 表单 -->
    <div class="loginForm">
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginRules">
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item
          label="重复密码"
          prop="repassword"
          v-if="repasswordIsShow"
        >
          <el-input v-model="loginForm.repassword"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validateCode" class="code">
          <el-input
            v-model="loginForm.validateCode"
            class="validateCodeInput"
          ></el-input>
          <el-button type="success" class="requireCode" @click="acquireCode"
            >获取验证码</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm">提交</el-button>
          <el-button @click="loginReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { login } from '../network/login'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const validatePassword = (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (state.loginForm.password !== '') {
          (loginFormRef.value as any).validateField('repassword')
        }
        callback()
      }
    }

    // 验证邮箱的规则
    // const checkEmail = (rule: any, value: string, callback: any) => {
    //   const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
    //   if (regEmail.test(value)) {
    //     // 说明这是合法的email
    //     return callback()
    //   }
    //   callback(new Error('请输入合法的邮箱'))
    // }
    var validatePassword2 = (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const state = reactive({
      loginState: [
        { text: '登录', id: 0 },
        { text: '注册', id: 1 }
      ],
      repasswordIsShow: false,
      selectRadio: 0,
      loginForm: {
        username: 'admin',
        password: '123456',
        repassword: '',
        validateCode: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' },
          {
            min: 5,
            max: 16,
            message: '密码长度在 5 到 16 个字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { required: true, validator: validatePassword2, trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        validateCode: [{ trigger: 'blur', message: '请输入验证码' }]
      }
    })
    const loginFormRef = ref('')
    const moduleState = ref('login')
    onMounted(() => {
      // console.log((loginFormRef.value as any).validateField)
    })
    // 切换登录注册触发此事件
    const loginRadioChange = (label: number) => {
      // label === 1
      //   ? (state.repasswordIsShow = true)
      //   : (state.repasswordIsShow = false)

      if (label === 1) {
        state.repasswordIsShow = true
        moduleState.value = 'register'
      } else {
        state.repasswordIsShow = false
        moduleState.value = 'login'
      }
      // console.log(moduleState.value)
    }
    // 重置登录表单
    const loginReset = () => {
      (loginFormRef.value as any).resetFields()
    }
    // 提交表单 请求数据
    const submitLoginForm = () => {
      if (moduleState.value === 'login') {
        (loginFormRef.value as any).validate(async valid => {
          // console.log(valid)
          if (!valid) return
          const loginObj = {
            username: state.loginForm.username,
            password: state.loginForm.password
          }
          const { data } = await login(loginObj)
          console.log(data)
          if (data.meta.status === 200) {
            store.state.userInfo = data.data
            window.localStorage.setItem('userInfoUsername', data.data.username)
            window.localStorage.setItem('userInfoToken', data.data.token)
            router.push('/home')
            ElMessage.success({
              message: '登录成功！',
              type: 'success'
            })
          }
        })
      }
    }
    const acquireCode = () => {
      console.log('获取验证码')
    }
    return {
      ...toRefs(state),
      loginFormRef,
      loginRadioChange,
      loginReset,
      submitLoginForm,
      acquireCode
    }
  }
})
</script>
<style lang="less">
body {
  background-color: #909399;
}
.login-bg {
  width: 150px;
  margin: 20px auto;
}
.loginForm {
  width: 500px;
  margin: 0 auto;
}

.validateCodeInput {
  display: block;
  width: 200px;
}
/deep/ .requireCode {
  display: inline-block;
  height: 30px;
}
</style>
