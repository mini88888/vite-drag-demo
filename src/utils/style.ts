import type { componentItem, Style } from '@/types'
import { isVaildKey, toPercent } from '@/utils'
import { sin, cos } from 'mathjs'

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

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style: {
  [key: string]: number,
}) {
  style = { ...style }
  if (style.rotate != 0) {
    const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
    const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
    style.left += diffX
    style.right = style.left + newWidth

    const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
    const diffY = (newHeight - style.height) / 2 // 始终是正
    style.top -= diffY
    style.bottom = style.top + newHeight

    style.width = newWidth
    style.height = newHeight
  } else {
    style.bottom = style.top + style.height
    style.right = style.left + style.width
  }

  return style
}

export function createGroupStyle(groupComponent: componentItem) {

  const parentStyle = groupComponent.style
  groupComponent.propValue.forEach((component: componentItem) => {
    // component.groupStyle 的 top left 是相对于 group 组件的位置
    // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
    if (!Object.keys(component.groupStyle).length) {
      const style = { ...component.style }
      if (component.component.startsWith('SVG')) {
        component.groupStyle = getSVGStyle(style)
      } else {
        component.groupStyle = getStyle(style)
      }

      const { left, top, width, height } = style

      component.groupStyle.left = toPercent((left - parentStyle.left) / parentStyle.width)
      component.groupStyle.top = toPercent((top - parentStyle.top) / parentStyle.height)
      component.groupStyle.width = toPercent(width / parentStyle.width)
      component.groupStyle.height = toPercent(height / parentStyle.height)
    }
  })
}