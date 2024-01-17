import { $ } from './index'
import { mod360 } from './translate'
import { componentItem, Style } from '@/types'

// 将组合中的各个子组件拆分出来，并计算它们新的 style
export function decomposeComponent(component: componentItem, editorRect: Record<string, any>, parentStyle: Style) {
  const componentRect = ($(`#component${component.id}`) as HTMLElement).getBoundingClientRect()
  // 获取元素的中心点坐标
  const center = {
    x: componentRect.left - editorRect.left + componentRect.width / 2,
    y: componentRect.top - editorRect.top + componentRect.height / 2,
  }

  component.style.rotate = mod360((component.style.rotate as number) + (parentStyle.rotate as number))
  component.style.width = parseFloat(`${component.groupStyle.width}`) / 100 * (parentStyle.width as number)
  component.style.height = parseFloat(`${component.groupStyle.height}`) / 100 * (parentStyle.height as number)
  // 计算出元素新的 top left 坐标
  component.style.left = center.x - component.style.width / 2
  component.style.top = center.y - component.style.height / 2
  component.groupStyle = {}
}