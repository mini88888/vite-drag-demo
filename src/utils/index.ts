export * from './style'

// dom选择
export const $ = (selector: string) => document.querySelector(selector)

export const changeStyleSizeScale = (value: number): number => {
  return value
}

export const isVaildKey = (key: string | number | symbol, object: Object): key is keyof object => key in object