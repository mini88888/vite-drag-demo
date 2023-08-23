export * from './style'
import { multiply, divide } from 'mathjs'
import { useStore } from '@/store'


// dom选择
export const $ = (selector: string) => document.querySelector(selector)

export const changeStyleSizeScale = (value: number): number => {
  const { canvasStyleData } = useStore()
  return multiply(value, divide(canvasStyleData.scale, 100))
}

export const isVaildKey = (key: string | number | symbol, object: Object): key is keyof object => key in object