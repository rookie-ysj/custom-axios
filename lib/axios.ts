import { Axios } from "./core/Axios";
import defaults from "./core/defaults";
import { mergeConfig } from "./core/mergeConfig";
import { extend } from "./helpers/utils";
import { AxiosInstance, AxiosRequestConfig } from "./types";


function createInstance(config: AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config)
    // 将 request 方法的 this 指向绑定到 context
    const instance = Axios.prototype.request.bind(context) as AxiosInstance
    // 将 context 中的属性和方法拷贝到 instance 上
    extend(instance, context)
    // 将 Axios.prototype 上的方法拷贝到 instance 上，并绑定 this 指向到 context
    extend(instance, Axios.prototype, context)

    // 添加 create 方法用于创建新的实例
    instance.create = function create(config: AxiosRequestConfig): AxiosInstance {
        return createInstance(mergeConfig(defaults, config))
    }

    return instance
}

const axios = createInstance(defaults)

export default axios