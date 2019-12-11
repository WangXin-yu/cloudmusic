const app = new getApp();
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
        radio_station: [],
        loading_finished: false,
      },

      ready(){
        this.getRadioStationData();
      },
      /**
       * 组件的方法列表
       */
      methods: {
        getRadioStationData() {
          wx.showLoading({
            title: '加载zhong...',
          })
          app.globalData.fly.get("/search?keywords=" + this.data.key_words +"&type=1009").then(res => {   
            wx.hideLoading();
            if (res.data.result.djRadios){
              this.setData({
                radio_station: res.data.result.djRadios
              })
            }
            this.setData({
              loading_finished: true
            })
          }
          ).catch(err=>{
            console.log(err);
          })
        }
      }
})