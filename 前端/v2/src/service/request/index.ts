import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HDRquestConfig, HDRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
// import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

// 封装一层 解耦axios 当axios库不用时 我们可以直接修改这一层的代码 调用这一层的代码不变
// 封装共同的特性：token loading
class HDRequest {
  instance: AxiosInstance
  interceptors?: HDRequestInterceptors
  loading?: any
  showLoading?: boolean
  constructor(config: HDRquestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    // 1.每次实例化 时可以添加拦截器
    this.instance.interceptors.request.use(
      // 拦截请求，修改config
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      // 拦截响应，修改resData
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 请求失败拦截')
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器:响应成功拦截')
        this.loading?.close()
        const data = res.data
        // console.log(res)
        return data
      },
      (err) => {
        // console.log('所有的实例都有的拦截器:响应失败拦截')
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  reqest<T = any>(config: HDRquestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading == false) {
        this.showLoading = false
      }
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. axios 在发送单个请求时可以再添加拦截器
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: HDRquestConfig<T>): Promise<T> {
    return this.reqest({ ...config, method: 'GET' })
  }
  post<T = any>(config: HDRquestConfig<T>): Promise<T> {
    return this.reqest({ ...config, method: 'POST' })
  }
  patch<T = any>(config: HDRquestConfig<T>): Promise<T> {
    return this.reqest({ ...config, method: 'PATCH' })
  }
  delete<T = any>(config: HDRquestConfig<T>): Promise<T> {
    return this.reqest({ ...config, method: 'DELETE' })
  }
}

export default HDRequest
