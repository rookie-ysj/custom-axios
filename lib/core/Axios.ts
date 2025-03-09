import { xhr } from "@/adapters/xhr";
import { AxiosRequestConfig, Axios as IAxios } from "@/types";

export class Axios implements IAxios {
  defaults: AxiosRequestConfig
  constructor(config: AxiosRequestConfig) {
    this.defaults = config
  }

  request(configOrUrl: AxiosRequestConfig | string, config: AxiosRequestConfig = { url: '' }) {
    if (typeof configOrUrl === 'string') {
      config.url = configOrUrl
    }
    else {
      config = configOrUrl
    }
    
    return xhr(config)
  }
}