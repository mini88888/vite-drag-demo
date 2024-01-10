export * from './style'
export * from './generateID'
export * from './translate'
export * from './calculateComponentPositonAndSize'
export * from './changeComponentsSizeWithScale'
export * from './attr'
export * from './request'
export * from './toast'
import { multiply, divide } from 'mathjs'
import { useStore } from '@/store'


// dom选择
export const $ = (selector: string) => document.querySelector(selector)

export const changeStyleSizeScale = (value: number): number => {
  const { canvasStyleData } = useStore()
  return multiply(value, divide(canvasStyleData.scale, 100))
}

export const isVaildKey = (key: string | number | symbol, object: Object): key is keyof object => key in object

export const deepCopy = (target: any) => {
  if (typeof target === 'object') {
    const result: Record<string, any> = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (!isVaildKey(key, target)) return
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }

    return result
  }

  return target
}

// 数组中交换项
export const swap = (arr: Array<any>, i: number, j: number) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
