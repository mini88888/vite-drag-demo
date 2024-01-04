import { ElMessage } from 'element-plus'

type msgType = 'success' | 'warning' | 'info' | 'error'

export const toast = (message: string = '', type: msgType = 'error', duration: number = 1500) => {
  ElMessage({
    message,
    type,
    duration,
  })
}

