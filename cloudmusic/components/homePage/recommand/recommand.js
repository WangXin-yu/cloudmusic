const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  // http://49.233.66.125:3000
  /**
   * 组件的初始数据
   */
  data: {
    recommand_list:[], //存储推荐歌单的歌曲数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取推荐歌单的数据
    getRecommandList() {
      wx.showLoading({
        title: '加载中...',
      })
      app.globalData.fly.get("http://49.233.66.125:3000/personalized?limit=6").then(res => { 
        wx.hideLoading();
        res.data.result.map(item=>{
          if (item.playCount > 100000000) {    //如果播放量达到了亿
            item.playCount = (item.playCount / 100000000).toFixed(1) + "亿";
          }
          if (item.playCount > 10000) { //大于1万那么单位就是万
            item.playCount = Math.round(item.playCount / 10000)+"万";
          }           
        })
        this.setData({
          recommand_list: res.data.result
        })
      }).catch(err => {
        console.log(err);
      })
    },
    //跳转到推荐歌单的歌单列表
    goToRecommandList(event){
      wx.navigateTo({
        url: '/pages/homePageToRecommendSongs/recommendSongs/recommendSongs?id='+event.currentTarget.dataset.id,
      })
    },
  },
  ready:function(){
    //获取推荐歌单的数据
    this.getRecommandList();
  }
})
