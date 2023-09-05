import { Style, Position } from '@/types'
import { calculateRotatedPointCoordinate, getCenterPoint } from './translate'

interface Props {
  point: string,
  style: Style,
  curPositon: Position,
  proportion: number,
  needLockProportion: boolean,
  pointInfo: {
    center: Position
    curPoint: Position
    symmetricPoint: Position
  }
}

const calculateRightBottom = ({ style, curPositon, proportion, needLockProportion, pointInfo }: Props) => {
  // console.log('calculateComponentPositonAndSize', style, curPositon, proportion, needLockProportion, pointInfo);
  const { symmetricPoint } = pointInfo
  const { rotate = 0 } = style
  let newCenterPoint = getCenterPoint(curPositon, symmetricPoint)
  let newTopLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -rotate)
  let newBottomRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -rotate)

  let newWidth = newBottomRightPoint.x - newTopLeftPoint.x
  let newHeight = newBottomRightPoint.y - newTopLeftPoint.y

  if (needLockProportion) {
    if (newWidth / newHeight > proportion) {
      newBottomRightPoint.x -= Math.abs(newWidth - newHeight * proportion)
      newWidth = newHeight * proportion
    } else {
      newBottomRightPoint.y -= Math.abs(newHeight - newWidth / proportion)
      newHeight = newWidth / proportion
    }

    const rotatedBottomRightPoint = calculateRotatedPointCoordinate(newBottomRightPoint, newCenterPoint, rotate)
    newCenterPoint = getCenterPoint(rotatedBottomRightPoint, symmetricPoint)
    newTopLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -rotate)
    newBottomRightPoint = calculateRotatedPointCoordinate(rotatedBottomRightPoint, newCenterPoint, -rotate)

    newWidth = newBottomRightPoint.x - newTopLeftPoint.x
    newHeight = newBottomRightPoint.y - newTopLeftPoint.y
  }

  if (newWidth > 0 && newHeight > 0) {
    style.width = Math.round(newWidth)
    style.height = Math.round(newHeight)
    style.left = Math.round(newTopLeftPoint.x)
    style.top = Math.round(newTopLeftPoint.y)
  }
}

const funcs: Record<string, Function> = {
  // lt: calculateLeftTop,
  // t: calculateTop,
  // rt: calculateRightTop,
  // r: calculateRight,
  rb: calculateRightBottom,
  // b: calculateBottom,
  // lb: calculateLeftBottom,
  // l: calculateLeft,
}

export const calculateComponentPositonAndSize = ({ point, style, curPositon, proportion, needLockProportion, pointInfo }: Props) => {
  // console.log('calculateComponentPositonAndSize', point, style, curPositon, proportion, needLockProportion, pointInfo);
  console.log(funcs[point]);
  funcs[point]({ style, curPositon, proportion, needLockProportion, pointInfo })
}