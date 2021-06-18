import { request } from '../network/request'
export function getMenu () {
  return request({
    method: 'GET',
    url: '/menus'
  })
}
