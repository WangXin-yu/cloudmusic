const app =  new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key_words: {
      type: String,
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    vedio_data: [],
    loading_finished: false,
  },
  ready(){
    this.getVediosData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getVediosData() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("/search?keywords=" + this.data.key_words+"&type= 1014").then(res => {
        wx.hideLoading();
        if(res.data.result.videos){
          this.setData({
            vedio_data: res.data.result.videos,
           
          })
        }
       this.setData({
         loading_finished: true,
       })
      }).catch(err => {
        console.log(err);
      })
    },
  }
})
