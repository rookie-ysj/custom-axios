import { AxiosPromise, AxiosRequestConfig } from "@/types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    resolve(config)
  })
}
