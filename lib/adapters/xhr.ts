import { AxiosPromise, AxiosRequestConfig } from "@/types"

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resovle, reject) => {
    const { data = null, url, method = 'get' } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resovle({
            data: request.responseText,
            status: request.status,
            statusText: request.statusText
          })
        } else {
          reject(new Error('request fail'))
        }
      }
    }
    request.send(data)
  })
}