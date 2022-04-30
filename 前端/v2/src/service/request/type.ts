import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface HDRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface HDRquestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HDRequestInterceptors<T>
  showLoading?: boolean
}

export { HDRquestConfig, HDRequestInterceptors }
