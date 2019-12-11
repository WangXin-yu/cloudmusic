// components/singerDetail/homePage/essentialInformation/essentialInformation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    introduction: {
      type: Array,
      value: []
    },
    singer_info:{
      type: {},
      value: ()=>{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show_popup: true
  },
  ready(){
    console.log(this.data.introduction);
    console.log(this.data.singer_info);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack(){
      this.setData({
        show_popup: false
      })
    }
  }
})
