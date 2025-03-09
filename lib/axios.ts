import { extend } from "@/helpers/utils.ts";
import Axios from "@/core/Axios.ts";
import { AxiosInstance, AxiosRequestConfig } from "@/types";
import { defaults } from "@/defaults";
import { mergeConfig } from "@/core/mergeConfig.ts";

function createInstance(defaultConfig: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(defaultConfig);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, Axios.prototype, context);
  extend(instance, context, null);
  return instance as AxiosInstance;
}

const axios = createInstance(defaults);

axios.create = (config: AxiosRequestConfig) => {
  return createInstance(mergeConfig(defaults, config))
}
console.log(axios)
export default axios
