export function flipProp<T = any>(obj: T) {
  return function (key: keyof T) {
    return obj[key]  
  }
}
