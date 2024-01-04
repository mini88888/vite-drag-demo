import title from '@/assets/title.jpg'

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
  icon: 'characters',
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
  icon: 'Icon_fuhao-anniu',
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
}, {
  component: 'Picture',
  label: '图片',
  icon: 'tupian',
  propValue: {
    // url: require('@/assets/title.jpg'),
    url: title,
    flip: {
      horizontal: false,
      vertical: false,
    },
  },
  style: {
    width: 300,
    height: 200,
    borderRadius: '',
  },
}, {
  component: 'RectShape',
  label: '矩形',
  propValue: '&nbsp;',
  icon: 'xingzhuang-juxing',
  style: {
    width: 200,
    height: 200,
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: 'center',
    color: '',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '',
    borderStyle: 'solid',
    borderRadius: '',
    verticalAlign: 'middle',
  },
}, {
  component: 'LineShape',
  label: '直线',
  propValue: '',
  icon: 'hr',
  style: {
    width: 200,
    height: 2,
    backgroundColor: '#000',
  },
}, {
  component: 'CircleShape',
  label: '圆形',
  propValue: '&nbsp;',
  icon: 'weixuanzhongyuanquan',
  style: {
    width: 200,
    height: 200,
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: 'center',
    color: '',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '',
    borderStyle: 'solid',
    borderRadius: '',
    verticalAlign: 'middle',
  },
}, {
  component: 'SVGStar',
  label: '星形',
  icon: 'star',
  propValue: '',
  style: {
    width: 80,
    height: 80,
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: 'center',
    color: '',
    borderColor: '#000',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}, {
  component: 'SVGTriangle',
  label: '三角形',
  icon: 'xingzhuang-sanjiaoxing',
  propValue: '',
  style: {
    width: 80,
    height: 80,
    fontSize: '',
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: 'center',
    color: '',
    borderColor: '#000',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}, {
  component: 'VTable',
  label: '表格',
  icon: 'biaoge',
  propValue: {
    data: [
      ['表头1', '表头2', '表头3'],
      ['内容1', '内容2', '内容3'],
    ],
    stripe: true,
    thBold: true,
  },
  request: {
    method: 'GET',
    data: [],
    url: '',
    series: false,
    time: 1000,
    paramType: '', // string object array
    requestCount: 0, // 请求次数限制，0 为无限
  },
  style: {
    width: 600,
    height: 200,
    fontSize: '',
    fontWeight: 400,
    textAlign: 'center',
    color: '',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}, {
  component: 'VChart',
  label: '图表',
  icon: 'tubiao',
  propValue: {
    chart: 'VChart',
    option: {
      title: {
        text: '柱状图',
        show: true,
      },
      legend: {
        show: true,
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
      xAxis: {
        show: true,
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {},
      series: {
        type: 'bar',
        name: '销量',
        data: [23, 61, 35, 77, 35],
        itemStyle: {
          barBorderRadius: 5,
          borderWidth: 1,
          borderType: 'solid',
          borderColor: '#73c0de',
          shadowColor: '#5470c6',
          shadowBlur: 3,
        },
      },
    },
  },
  style: {
    width: 800,
    height: 500,
    borderRadius: '',
  },
}]

list.forEach(item => {
  Object.assign(item, commonAttr)
  Object.assign(item.style, commonStyle)
})

export default list