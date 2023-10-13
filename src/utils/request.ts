import type { componentItem } from '@/types'
import { ElMessage } from 'element-plus'
interface requestOps {
  method: string,
  data: Array<any>,
  url: string,
  series: boolean,
  time: number,
  paramType: string, // string object array
  requestCount: number, // 请求次数限制，0 为无限
}
export const urlRE = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/

export function getURL(url: string) {
  return url.startsWith('http') ? url : 'https://' + url
}

function getURLParam(data: Array<any>) {
  let result = ''
  data.forEach(item => {
    if (item[0]) {
      result += `&${item[0]}=${item[1]}`
    }
  })

  return result ? '?' + result : ''
}


function getURLData(data: Array<any>, paramType: string) {
  if (!data) return ''

  if (paramType === 'array') {
    return data
  }

  const result: Record<string, any> = {}
  data.forEach(item => {
    if (item[0]) {
      result[item[0]] = item[1]
    }
  })

  return result
}

const request = (options: requestOps, responseType: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.timeout = 6000

    let url = getURL(options.url)
    if (options.method === 'GET') {
      url += `${getURLParam(options.data)}`
    }

    xhr.open(options.method, url)

    xhr.ontimeout = reject
    xhr.onerror = reject
    xhr.onload = (e: ProgressEvent<EventTarget>) => {
      resolve(e.target?.response)
    }

    xhr.send(JSON.stringify(getURLData(options.data, options.paramType)))
  })
}


/**
 *
 * @param {object} options 请求的相关参数
 * @param {object} obj 需要修改的数据的父对象
 * @param {string} key 需要修改的数据在父对象中对应的 key
 * @param {string} responseType 需要修改的数据对应的类型
 * @returns {function} 可以取消请求的函数
 */
export default function requestWarpper(options: requestOps, obj: any, key: string, responseType = 'object') {
  let count = 0
  let timer: any
  const url = options?.url
  if (url && !/^\d+$/.test(url) || urlRE.test(getURL(url))) {
    if (!options.series) {
      request(options, responseType)
        .then(data => {
          if (responseType === 'object' || responseType === 'array') {
            obj[key] = JSON.parse(data)
          } else {
            obj[key] = data
          }
        })
        .catch(err => ElMessage.error(err?.message || err))
    } else {
      timer = setInterval(() => {
        if (options.requestCount != 0 && options.requestCount <= count) {
          clearInterval(timer)
          return
        }

        count++
        request(options, responseType)
          .then(data => {
            if (responseType === 'object' || responseType === 'array') {
              obj[key] = JSON.parse(data)
            } else {
              obj[key] = data
            }
          })
          .catch(err => ElMessage.error(err?.message || err))
      }, options.time)
    }
  }

  return function cancelRequest() {
    clearInterval(timer)
  }
}
