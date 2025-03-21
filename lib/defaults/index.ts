import { type AxiosRequestConfig } from "../types";

const defaults: AxiosRequestConfig = {
  method: 'get',
  adapter: ['xhr', 'http', 'fetch'],
}

export default defaults
