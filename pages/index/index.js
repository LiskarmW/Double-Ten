//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    clockShow: false, //选择页与倒计时页切换显示
    time: '25', //初始番茄钟默认时间
    mTime: 25 * 60 * 1000,
    timeStr: '25:00',
    iconActive: '-1', //默认不选择事件
    rate: '',
    clockHeight: 0,
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
  onLoad: function name(params) {
    //获得当前设备的信息
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    //获得 rpx 与当前设备宽度的比
    //小程序默认都 750 rpx
    this.setData({
      rate: rate,
      clockHeight: rate * res.windowHeight
    })

  },
  sliderChange: function name(params) {
    //console.log(params);
    this.setData({
      time: params.detail.value
    })
  },
  clickIcon: function name(params) {
    // console.log(params);
    this.setData({
      iconActive: params.currentTarget.dataset.index
    })
  },
  start: function name(params) {
    this.setData({
      clockShow: true,
      // 根据用户选择的 time 值更新 mTime 的值
      mTime: this.data.time * 60 * 1000,
      // 根据用户选择的 time 值更新倒计时文字
      timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ":00" : "0" + this.data.time + ":00",
    })
    this.drawBg();
    this.drawActive();
  },
  // 画黑色背景圆
  drawBg: function name(params) {
    //rpx 转化为 px
    var lineWidth = 6 / this.data.rate;
    var ctx = wx.createCanvasContext('progress_bg');
    //var  ctx = wx.createSelectorQuery()
    //ctx.select("#progress_bg");
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";
    // ctx.setLineCap("round");
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },
  //画白色动态圆
  drawActive: function name(params) {
    // 设置一个定时器
    var _this = this;
    var timer = setInterval(function () {
      var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.mTime) / (_this.data.time * 60 * 1000);
      // 更新 mTime
      var currentTime = _this.data.mTime - 100;
      _this.setData({
        mTime: currentTime,
      });
      if (angle < 3.5) {
        // 时间文本的动态变化
        if (currentTime % 1000 == 0) {
          var timeStr1 = currentTime / 1000; // 总的秒数
          var timeStr2 = parseInt(timeStr1 / 60); // 分钟数
          var timeStr3 = timeStr1 - timeStr2 * 60; // 分钟之后的秒数
          var timeStr2 = timeStr2 >= 10 ? timeStr2 : "0" + timeStr2;
          var timeStr3 = timeStr3 >= 10 ? timeStr3 : "0" + timeStr3;
          _this.setData({
            timeStr:timeStr2+":"+timeStr3
          })
        }
        //rpx 转化为 px
        var lineWidth = 6 / _this.data.rate;
        var ctx = wx.createCanvasContext('progress_active');
        //var  ctx = wx.createSelectorQuery()
        //ctx.select("#progress_bg");
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#ffffff";
        ctx.lineCap = "round";
        // ctx.setLineCap("round");
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
      } else {
        // 清空计时器 timer
        clearInterval(timer);
        //时间文本设为 0
        _this.setData({
          timeStr:"00:00",
        })
      }
    }, 100);

  },
})