// 公共样式
const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const commonAttr = {
  isLock: false, // 是否锁定组件
}

const list = [{
  component: 'VText',
  label: '文字',
  propValue: '双击编辑文字',
  icon: 'icon-characters',
  iconSize: '12px',
  request: {
    method: 'GET',
    data: [],
    url: '',
    series: false, // 是否定时发送请求
    time: 1000, // 定时更新时间
    paramType: '', // string object array
    requestCount: 0, // 请求次数限制，0 为无限
  },
  style: {
    width: 200,
    height: 28,
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: '',
    color: '',
  },
}, {
  component: 'VButton',
  label: '按钮',
  propValue: '按钮',
  icon: 'icon-Icon_fuhao-anniu',
  iconSize: '24px',
  style: {
    width: 100,
    height: 34,
    borderWidth: 1,
    borderColor: '',
    borderRadius: '',
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: '',
    color: '',
    backgroundColor: '',
  },
}]

list.forEach(item => {
  Object.assign(item, commonAttr)
  Object.assign(item.style, commonStyle)
})

export default list