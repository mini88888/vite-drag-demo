import { curComponent } from './components'
import type { componentItem } from '@/types'

export const lock = () => (curComponent.value as componentItem).isLock = true
export const unlock = () => (curComponent.value as componentItem).isLock = false