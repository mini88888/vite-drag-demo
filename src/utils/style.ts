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


export const getSVGStyle = (style: Style, filter: string[] = []) => {
  const result: Record<string, any> = {};

  [
    'opacity',
    'width',
    'height',
    'top',
    'left',
    'rotate',
    'fontSize',
    'fontWeight',
    'lineHeight',
    'letterSpacing',
    'textAlign',
    'color',
  ].forEach(key => {
    if (!isVaildKey(key, style)) return
    if (!filter.includes(key)) {
      if (key != 'rotate') {
        if (style[key] !== '') {
          result[key] = style[key]

          if (needUnit.includes(key)) {
            result[key] += 'px'
          }
        }
      } else {
        result.transform = key + '(' + style[key] + 'deg)'
      }
    }
  })

  return result
}

const filterKeys = ['width', 'height', 'scale']
export function getCanvasStyle(canvasStyleData: Style) {
  console.log('canvasStyleData', canvasStyleData);

  const result: Record<string, any> = {}
  Object.keys(canvasStyleData).filter(key => !filterKeys.includes(key)).forEach(key => {
    if (!isVaildKey(key, canvasStyleData)) return
    result[key] = canvasStyleData[key]
    if (key === 'fontSize') {
      result[key] += 'px'
    }
  })

  return result
}
