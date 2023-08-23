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

export const getShapeStyle = (style: Style) => {
  const result: Record<string, any> = {};
  ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
    if (!isVaildKey(attr, style)) return
    if (attr != 'rotate') {
      result[attr] = style[attr] + 'px'
    } else {
      result.transform = 'rotate(' + style[attr] + 'deg)'
    }
  })

  return result
}

export const getStyle = (style: Style, filter: string[] = []) => {
  const result: Record<string, any> = {}
  Object.keys(style).forEach((key: string) => {
    if (!isVaildKey(key, style)) return
    if (!filter.includes(key)) {
      if (key !== 'rotate') {
        if (style[key] !== '') {
          const val = needUnit.includes(key) ? `${style[key]}px` : style[key]
          result[key] = val
        }
      } else {
        result.transform = `${key}(${style[key]}deg)`
      }
    }
  })

  return result
}
