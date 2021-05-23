import { request } from '../network/request'
/*
 获取验证码接口
 */
interface Login {
  username: string
  password: string
}
export function login (data: Login) {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}
