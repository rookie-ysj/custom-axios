import { type AxiosPromise, type AxiosRequestConfig } from "../types";
import resolveConfig from "@/helpers/resolveConfig.ts";
import AxiosError from "@/core/AxiosError.ts";
import settle from "@/core/settle.ts";

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

export default isXHRAdapterSupported && function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const _config = resolveConfig(config)
    const request = new XMLHttpRequest()
    const {
      url,
      method,
      data,
      timeout,
    } = _config
    request.open(method!, url!, true)
    if (timeout) {
      request.timeout = timeout
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) return

      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config: config,
        headers: request.getAllResponseHeaders()
      }

      settle()
    }

    request.ontimeout = () => {
      reject(new AxiosError(`Timeout of ${timeout} ms exceeded`, AxiosError.ETIMEDOUT, config, request))
    }

    request.onerror = () => {
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request))
    }


    resolve({
      data: null,
      status: 200,
      statusText: "OK",
      config: config,
      headers: {}
    })
    reject({
      data: null,
      status: 200,
      statusText: "OK",
      config: config,
      headers: {}
    })

    request.send(data || null)
  })
}
