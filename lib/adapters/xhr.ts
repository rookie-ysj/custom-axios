import { type AxiosPromise, type AxiosRequestConfig } from "../types";

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

export default isXHRAdapterSupported && function xhr(config: AxiosRequestConfig): AxiosPromise {

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
