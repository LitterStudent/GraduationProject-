import axios, { AxiosResponse } from 'axios'

// 1.axios 全局配置
axios.defaults.baseURL = ''
axios.defaults.timeout = 10000

// 2.axios 每个请求的单独配置
axios
  .get('http://123.207.32.32:8000/home/multidata')
  .then((res: AxiosResponse) => {
    console.log(res)
  })

axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'dongdong',
      age: 12
    }
  })
  .then((res) => {
    console.log(res)
  })
axios
  .post('http://httpbin.org/post', {
    params: {
      name: 'dongdong',
      age: 12
    }
  })
  .then((res) => {
    console.log(res)
  })

// 3. axios.all
// axios
//   .all([
//     axios.post('http://httpbin.org/post', {
//       params: {
//         name: 'dongdong',
//         age: 12
//       }
//     }),
//     axios.post('http://httpbin.org/post', {
//       params: {
//         name: 'dongdong',
//         age: 12
//       }
//     })
//   ])
//   .then((res) => {
//     console.log(res)
//   })

// 4.axios.interceptor

axios.interceptors.request.use(
  (config) => {
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log('请求发送失败')
    return err
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log('请求响应成功的拦截')
    console.log(res)
  },
  (err) => {
    console.log('请求发送失败')
    console.log(err)
  }
)
axios
  .post('http://httpbin.org/post', {
    params: {
      name: 'dongdong',
      age: 12
    }
  })
  .then((res) => {
    console.log(res)
  })
