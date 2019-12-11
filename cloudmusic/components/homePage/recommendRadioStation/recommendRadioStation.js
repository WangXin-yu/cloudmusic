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
    djprogram:[],   //存储推荐电台的数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取推荐电台的数据
    getDjprogramData(){
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/personalized/djprogram").then(res=>{
        wx.hideLoading();
        this.setData({
          djprogram:res.data.result
        })
        console.log(this.data.djprogram);
      }).catch(err=>{
        console.log(err);
      })
    },
    //跳转到电台详情页
    goToRadioStationDetail(event){
      console.log(111);
      wx.navigateTo({
        url: '/pages/homePageToRadioStation/homePageToRadioStation?id='+event.currentTarget.dataset.id,
      })
    }
  },

  ready:function(){
    this.getDjprogramData();
  }
})
