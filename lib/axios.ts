import defaults from "./defaults";
import { type AxiosInstance, type AxiosRequestConfig } from "./types";
import Axios from './core/Axios'
import { mergeConfig } from "./core/mergeConfig";
import { extend } from "./helpers/utils";


function createInstance(defaults: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(defaults)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, Axios.prototype, context)
  // extend(instance, context, null)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)
axios.Axios = Axios
axios.create = (config: AxiosRequestConfig) => {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
