import { AxiosRequestConfig, AxiosResponse } from "@/types";
import adapters from '../adapters/adapters.ts'
import defaults from "../defaults";

// function throwIfCancellationRequested(config) {
//   if (config.cancelToken) {
//     config.cancelToken
//   }
// }

export default function dispatchRequest(config: AxiosRequestConfig) {
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter!)

  return adapter(config).then(
    function onAdapterResolution(response: AxiosResponse) {
      console.log(response)
      return response
    },
    function onAdapterRejection(reason: AxiosResponse) {
      return reason
    }
  )
}
