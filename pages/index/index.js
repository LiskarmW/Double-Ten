//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    time:'25',
    iconActive:'-1',//默认不选择事件
    cateArr: [{
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: "学习"
      },
      {
        icon: 'think',
        text: '思考'
      },
      {
        icon: 'write',
        text: '写作'
      },
      {
        icon: 'sport',
        text: '运动'
      },
      {
        icon: 'read',
        text: '阅读'
      },
    ]
  },
  //事件处理函数
  sliderChange:function name(params) {
    //console.log(params);
    this.setData({
      time:params.detail.value
    })
  },
  clickIcon:function name(params) {
    console.log(params);
    this.setData({
      iconActive:params.currentTarget.dataset.index
    })
  }
})