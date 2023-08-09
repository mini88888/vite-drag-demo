const commonStyle = {
  rotate: 0,
  opacity: 1,
}


const list = [{
  component: 'VText',
  label: '文字',
  propValue: '双击编辑文字',
  icon: 'icon-characters',
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
}]

list.forEach(item => {
  Object.assign(item.style, commonStyle)
})

export default list