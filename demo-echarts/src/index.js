import echarts from 'echarts';

import data from './data';
import './style.css';

const myChart = echarts.init(document.querySelector('#main'));

const lineStyle = {
  normal: {
    width: 1,
    opacity: 0.5
  }
};

const option = {
  backgroundColor: '#161627',
  title: {
    text: 'AQI - 雷达图',
    left: 'center',
    textStyle: {
      color: '#eee'
    }
  },
  legend: {
    bottom: 5,
    data: ['北京', '上海', '广州'],
    itemGap: 20,
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    selectedMode: 'single'
  },
  radar: {
    indicator: [
      { name: 'AQI', max: 300 },
      { name: 'PM2.5', max: 250 },
      { name: 'PM10', max: 300 },
      { name: 'CO', max: 5 },
      { name: 'NO2', max: 200 },
      { name: 'SO2', max: 100 }
    ],
    shape: 'circle',
    splitNumber: 5,
    name: {
      textStyle: {
        color: 'rgb(238, 197, 102)'
      }
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
          'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
          'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(238, 197, 102, 0.5)'
      }
    }
  },
  series: [{
      name: '北京',
      type: 'radar',
      lineStyle: lineStyle,
      data: data.dataBJ,
      symbol: 'none',
      itemStyle: {
        normal: {
          color: '#F9713C'
        }
      },
      areaStyle: {
        normal: {
          opacity: 0.1
        }
      }
    },
    {
      name: '上海',
      type: 'radar',
      lineStyle: lineStyle,
      data: data.dataSH,
      symbol: 'none',
      itemStyle: {
        normal: {
          color: '#B3E4A1'
        }
      },
      areaStyle: {
        normal: {
          opacity: 0.05
        }
      }
    },
    {
      name: '广州',
      type: 'radar',
      lineStyle: lineStyle,
      data: data.dataGZ,
      symbol: 'none',
      itemStyle: {
        normal: {
          color: 'rgb(238, 197, 102)'
        }
      },
      areaStyle: {
        normal: {
          opacity: 0.05
        }
      }
    }
  ]
};

myChart.setOption(option);