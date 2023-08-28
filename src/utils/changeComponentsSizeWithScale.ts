import { divide, multiply } from 'mathjs'
import { useStore } from '@/store'

const { canvasStyleData } = useStore()

const needToChangeAttrs2 = ['width', 'height', 'fontSize']
export const changeComponentSizeWithScale = (component) => {
  Object.keys(component.style).forEach(key => {
    if (needToChangeAttrs2.includes(key)) {
      if (key === 'fontSize' && component.style[key] === '') return

      component.style[key] = format(component.style[key], canvasStyleData.scale)
    }
  })
}

const format = (value: number, scale: number) => {
  return multiply(value, divide(scale, 100))
}