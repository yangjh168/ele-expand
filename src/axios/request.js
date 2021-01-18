import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// const successList = ['200', '201 ', '202 '] // 成功状态码
const messageList = [400, 403, 404, 406, 410, 422] // 客户端失败状态码
const reLogin = 401

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 默认情况下直接成功
    // console.log(response)
    return response.data
  },
  async error => {
    if (messageList.indexOf(error.response && error.response.status) !== -1) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 3 * 1000
      })
    } else if (error.response && error.response.status === reLogin) {
      console.log(error.response && error.response.status === reLogin)
      try {
        await MessageBox.alert('请重新登录登录过期', '登录过期')
      } catch (err) {
        console.log(err)
      }
    } else {
      Message({
        message: '服务器错误,请重试',
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
