import type { Style } from '@/types'
import { isVaildKey } from '@/utils'

const needUnit = [
  'fontSize',
  'width',
  'height',
  'top',
  'left',
  'borderWidth',
  'letterSpacing',
  'borderRadius',
]

export const getStyle = (style: Style, filter: string[] = []) => {
  console.log(style, filter);
  interface Result extends Style {
    transform?: string
  }
  const result: Result = {}
  Object.keys(style).forEach((key: string) => {
    if (!isVaildKey(key, style)) return
    if (!filter.includes(key)) {
      if (key !== 'rotate') {
        if (style[key] !== '') {
          const val = needUnit.includes(key) ? `${style[key]}px` : style[key]
          result[key] = val
        }
      } else {
        result.transform = `${key} (${style[key] as number}deg)`
      }
    }
  })
}
