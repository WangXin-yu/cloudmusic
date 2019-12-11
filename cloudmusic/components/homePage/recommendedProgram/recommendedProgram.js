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
    programs: [],   //存储推荐节目的数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到电台详情页
    goToRadioStationDetail(event) {
      console.log(111);
      wx.navigateTo({
        url: '/pages/homePageToRadioStation/homePageToRadioStation?id=' + event.currentTarget.dataset.id,
      })
    },
    //获取推荐节目的数据
    getProgrameData(){
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/program/recommend?limit=6").then(res=>{
        wx.hideLoading();
        this.setData({
          programs: res.data.programs
        })
        console.log(this.data.programs);
      }).catch(err=>{
        console.log(err);
      })
    }
  },

  ready: function(){
    this.getProgrameData();
  }
})
