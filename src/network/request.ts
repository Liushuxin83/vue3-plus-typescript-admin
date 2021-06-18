/*
  封装axios
 */
// import store from '../store/index'
import axios from 'axios'
// axios的config参数接口约束
// interface axiosConfig {
//   method: string
//   url: string
//   data?: any
//   params?: any
// }
export function request (config: any) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 10000
  })
  // 拦截器
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // console.log(config)

      if (window.localStorage.getItem('userInfoToken')) {
        config.headers.Authorization = window.localStorage.getItem(
          'userInfoToken'
        )
        return config
      } else {
        return config
      }
      // return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response);
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  // 发送网络请求
  return instance(config)
}
