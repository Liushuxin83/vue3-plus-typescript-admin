import { request } from '../network/request'
// 获取用户列表
interface UsersList {
  query?: string
  pagenum: number
  pagesize: number
}
export function getUsersList (params: UsersList) {
  return request({
    method: 'GET',
    url: '/users',
    params
  })
}
// 更改用户状态
export function updateUserState (uId: number, type: boolean) {
  return request({
    method: 'PUT',
    url: `/users/${uId}/state/${type}`
  })
}
// 删除用户
export function deleteUser (id: number) {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}
