import { divide, multiply } from 'mathjs'
import { useStore } from '@/store'
import { componentItem } from '@/types'


const needToChangeAttrs2 = ['width', 'height', 'fontSize']
export const changeComponentSizeWithScale = (component: componentItem) => {
  const { canvasStyleData } = useStore()
  Object.keys(component.style).forEach(key => {
    if (needToChangeAttrs2.includes(key)) {
      if (key === 'fontSize' && component.style[key] === '') return

      component.style[key] = format(component.style[key] as number, canvasStyleData.scale)
    }
  })
}

const format = (value: number, scale: number) => {
  return multiply(value, divide(scale, 100))
}