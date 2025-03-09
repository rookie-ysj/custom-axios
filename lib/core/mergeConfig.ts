export function mergeConfig(config1: any, config2: any): any {
  
  return {
    ...config1,
   ...config2
  }
}