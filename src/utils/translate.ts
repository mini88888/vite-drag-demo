import { Position } from '@/types'
import { divide, multiply } from 'mathjs'
import { useStore } from '@/store'

// 取余 360
export const mod360 = (deg: number): number => (deg + 360) % 360

// 求两点之间的中点坐标
export const getCenterPoint = (p1: Position, p2: Position) => {
  return {
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2),
  }
}

// 角度转弧度
// Math.PI = 180 度
const angleToRadian = (angle: number) => {
  return angle * Math.PI / 180
}


/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  point  旋转前的点坐标
 * @param   {Object}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {Object}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export const calculateRotatedPointCoordinate = (point: Position, center: Position, rotate: number) => {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x: (point.x - center.x) * Math.cos(angleToRadian(rotate)) - (point.y - center.y) * Math.sin(angleToRadian(rotate)) + center.x,
    y: (point.x - center.x) * Math.sin(angleToRadian(rotate)) + (point.y - center.y) * Math.cos(angleToRadian(rotate)) + center.y,
  }
}

export function changeStyleWithScale(value: number) {
  const { canvasStyleData } = useStore()
  return multiply(value, divide(parseInt(`${canvasStyleData.scale}`), 100))
}

export function toPercent(val: number) {
  return val * 100 + '%'
}
