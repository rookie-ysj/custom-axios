import xhr from "@/adapters/xhr.ts";
import { AxiosRequestConfig, PromiseFunc } from "@/types";
import fetch from "./fetch";
import { isArray, isFunction, isString } from "@/helpers/utils.ts";
import AxiosError from "@/core/AxiosError.ts";

type Adapter = AxiosRequestConfig['adapter']

const knownAdapters: Record<string, PromiseFunc | boolean> = {
  xhr: xhr,
  fetch: fetch,
}

const renderReason = (reason: string) => `- ${reason}`;

export default {
  getAdapter(adapters: Adapter[] | Adapter) {
    adapters = isArray(adapters) ? adapters : [adapters]
    const {length} = adapters
    let nameOrAdapter: Adapter
    let adapter: Function | boolean | undefined
    const rejectedReasons = {}

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i]
      let id
      adapter = isString(nameOrAdapter) ? adapters[(id = String(nameOrAdapter).toLowerCase())] : nameOrAdapter

      if (adapter === undefined) {
        throw new AxiosError(`Unknown adapter ${id}"`)
      }

      if (adapter) {
        break
      }
      rejectedReasons[id || '#' + i] = adapter
    }

    if (!adapter) {
      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );
      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    if (!isFunction(adapter)) {
      throw new TypeError('adapter is not a function')
    }

    return adapter
  },

  knownAdapters
}
