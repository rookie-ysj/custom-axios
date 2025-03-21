import { type AxiosRequestConfig } from "../types";

const defaults: AxiosRequestConfig = {
  method: 'get',
  adapter: ['xhr', 'http', 'fetch'],
  timeout: 0, // 0 表示没有超时时间
  validateStatus: (status) => status >= 200 && status < 300
}

export default defaults
