import { type AxiosPromise, type AxiosRequestConfig } from "../types";

const isFetchAdapterSupported = typeof fetch !== "undefined";

export default isFetchAdapterSupported && function fetch(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
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
  })
}
