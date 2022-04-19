import axios from 'axios'
class HDRequest {
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 1.每次实例化 时可以添加拦截器
    this.instance.interceptors.request.use(
      // 拦截请求，修改config
      this.interceptors.requestInterceptor,
      this.interceptors.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      // 拦截响应，修改resData
      this.interceptors.responseInterceptor,
      this.interceptors.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
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
        // console.log(res)
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
  reqest(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2. axios 在发送单个请求时可以再添加拦截器
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(config) {
    return this.reqest({ ...config, method: 'GET' })
  }
  post(config) {
    return this.reqest({ ...config, method: 'POST' })
  }
  patch(config) {
    return this.reqest({ ...config, method: 'PATCH' })
  }
  delete(config) {
    return this.reqest({ ...config, method: 'DELETE' })
  }
  put(config) {
    return this.reqest({ ...config, method: 'PUT' })
  }
}

export default HDRequest
