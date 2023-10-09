import { AxiosRequestConfig } from 'axios'

export default interface IUseAxios {
  method: string // 'POST'
  url: string // '/posts'
  headers?: {
    // no need to stringify
    accept: string // '*/*'
  }
  params?: any
  data?: {
    // no need to stringify
  }
}

export interface MyAxiosRequestConfig extends AxiosRequestConfig {
  cache?: {
    maxAge: number
    exclude: {
      query: boolean
    }
  }
}
