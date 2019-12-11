const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    banner_data: [],
    indicatorDots: true,//导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取banner图的图片数据
    getBannerImages(){
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("http://49.233.66.125:3000/banner?type=1").then(res=>{
        wx.hideLoading();
        this.setData({
          banner_data: res.data.banners
        })
      }).catch(err=>{
        console.log(err);
      })
    }
  },

  ready:function(){
    this.getBannerImages()
  }
})
