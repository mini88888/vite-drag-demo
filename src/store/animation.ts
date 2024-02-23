import { curComponent } from './components'
import { componentItem } from '@/types'

export const addAnimation = (animation: {
  label: string,
  value: string
}) => {
  (curComponent.value as componentItem).animations.push(animation)
}

export const alterAnimation = (index: number, data: Record<string, any>) => {
  if (typeof index === 'number') {
    Object.assign((curComponent.value as componentItem).animations[index], {
      ...data
    })
    // const original = (curComponent.value as componentItem).animations[index]
    //   (curComponent.value as componentItem).animations[index] = { ...original, ...data }
  }
}