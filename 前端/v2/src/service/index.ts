import HDRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localcache from '@/utils/cache'
const hdRequest = new HDRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localcache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log(err)
      console.log(err.status)
      return err
    },
    responseInterceptor: (res) => {
      return res
    }
    // responseInterceptorCatch: (err) => {
    //   console.log(err)
    //   console.log({ ...err })
    //   console.log(err.response.data.status)
    //   return err
    // }
  }
})
export default hdRequest
