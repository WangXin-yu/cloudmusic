const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    singer_id:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mvs: [],
    loading_finished: false
  },
  ready() {
    this.getMv();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getMv(){
      app.globalData.fly.get("/artist/mv?id=" + this.data.singer_id).then(res => {
        console.log(res);
        if (res.data.mvs){
          this.setData({
            mvs: res.data.mvs
          })
        }
        this.setData({
          loading_finished: true
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
