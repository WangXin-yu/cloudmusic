const city_array = require("../../lib/city/city.js");
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    nickname: "",
    sex: "",
    //性别选项
    show_sex: false,
    //生日选择框
    show_birthday: false,
    birthday: '',
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    minDate: {},
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else{
        return `${value}日`;
      }
      return value;
    },
    // 城市
    city: "",
    city_arr:[],    //存储所有城市的列表
    show_city: false,
    //绑定个性签名
    autograph: "",
  },
  //点击确认修改
  confirmModify(){
    // console.log(this.data.birthday)
    // console.log(this.data.city)
    let nickname = this.data.nickname;
    let gender = 0;
    if (this.data.sex === "男"){
      gender = 1
    }else if(this.data.sex === "女"){
      gender = 2
    }else{
      gender = 3;
    };
    let autograph = this.data.autograph;
    // 修改birthday
    let date = new Date();
    let year = this.data.birthday.split("年");
    let month = year[1].split("月");
    let day = month[1].split("日");
    date.setFullYear(year[0]);
    date.setMonth(month[0]);
    date.setDate(day[0]);
    //将该时间对象转换成时间戳
    let time_stamp = Date.parse(date);
    //修改城市
    //1.获取市
    let city_character_index, province_character_index;
    let city_id, province_id;
    city_character_index = this.data.city.indexOf("市");
    province_character_index = this.data.city.indexOf("省")
    // console.log(city_character_index);
    //如果省份不存在，那么是直辖市
    if (province_character_index === -1){
      //获取直辖市的id
      for (let key in city_array.default) {
        for (let key_son in city_array.default[key]) {
          if (this.data.city === city_array.default[key][key_son])
            city_id = key_son
        }
      }
    } else {//如果省份存在
      //获取省份的id
      let province_content = this.data.city.substring(0, province_character_index+1);  
      for (let key in city_array.default) {
        for (let key_son in city_array.default[key]) {
          if (province_content === city_array.default[key][key_son])
            province_id = key_son
        }
      }
      //获取直辖市的id
      let city_content = this.data.city.substring(province_character_index + 1)
      for (let key in city_array.default) {
        for (let key_son in city_array.default[key]) {
          if (city_content === city_array.default[key][key_son])
            city_id = key_son
        }
      }
    }
    let user = wx.getStorageSync("user");
    user.profile.nickname = nickname;
    user.profile.gender = gender;
    user.profile.birthday = time_stamp;
    user.profile.province = parseInt(province_id);
    user.profile.city = parseInt(city_id);
    user.profile.description = this.data.autograph;
    wx.setStorageSync("user", user);
    wx.showToast({
      title: '修改成功!',
    })
  },
  //绑定个性签名的输入
  autographInput(event){
    console.log(event);
    this.setData({
      autograph: event.detail.value
    })
    console.log(this.data.autograph);
  },

  //初始化界面
  init(){
    let user_info = wx.getStorageSync("user");
    //获取性别
    let gender = "";
    if (user_info.profile.gender === 1){
      gender = "男"
    } else if (user_info.profile.gender === 2){
      gender = "女"
    } else{
      gender = "保密"
    }
    //获取默认的生日
    let date = new Date(user_info.profile.birthday);
    let birthday = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
    //获取城市
    let city_id = user_info.profile.city, city;
    let province_id = user_info.profile.province, province;
    for(let key in city_array.default){
      for (let key_son in city_array.default[key]){
        if (key_son == user_info.profile.city){
          city = city_array.default[key][key_son]
        }
        if (key_son == user_info.profile.province) {
          province = city_array.default[key][key_son]
        }
      }
    }
    if (!province){
      province = ""
    }
    // 获取个性签名
    let autograph = user_info.profile.description
    this.setData({
      nickname: user_info.profile.nickname,
      birthday: birthday,
      city: province + city,
      sex: gender,
      autograph: autograph
    })
  },
  //监听昵称的输入事件
  nicknameOnChange(event) {
    this.setData({
      nickname: event.detail,
    })
  },
  //点击城市时弹出城市选择框
  showCityPopUp() {
    this.setData({
      show_city: true,
    })
  },
  //城市选择确定时
  cityConfirm(value){ 
    let city_info = value.detail.values;
    let format_city = [], result = [];
    for(let key in city_info){
      format_city.push(city_info[key].name);
      // console.log(city_info[key].name);
    }
    for (let i = 0; i < format_city.length; i++){
      if (result.indexOf(format_city[i]) == -1){
        result.push(format_city[i])
      }
    }
    let city_string = result.join("");
    this.setData({
      city: city_string,
      show_city: false
    })
  },
  //生日弹出层点击取消时
  cityCancle() {
    this.setData({
      show_city: false
    })
  },
  //点击日期时弹出日期选择框
  showBirthDayPopUp(){
    this.setData({
      show_birthday: true,
    })
  },
  //生日弹出层点击确定时
  birthdayConfirm(value){
    let date = new Date(value.detail);
    let obj = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+(date.getDate())+"日";
    this.setData({
      show_birthday: false,
      birthday: obj
    })
  },
  //生日弹出层点击取消时
  birthdayCancle(){
    this.setData({
      show_birthday: false
    })
  },
  // 点击性别选项弹出选择框
  popUpSex(){
    this.setData({
      show_sex: true
    })
  },
  //选中sex时
  onSelectSex(event){
    this.setData({
      show_sex: false,
      sex: event.currentTarget.dataset.sex,
    })
  },
  // 点击遮罩层时关闭选择框 
  onCloseSexPopUp(){
    this.setData({
      show_sex: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
    this.setData({
      city_arr: city_array.default
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})