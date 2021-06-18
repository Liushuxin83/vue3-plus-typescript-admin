import { ref } from 'vue'
const loginFormRef = ref('')
export const validatePassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (state.loginForm.password !== '') {
      (loginFormRef.value as any).validateField('password')
    }
    callback()
  }
}
