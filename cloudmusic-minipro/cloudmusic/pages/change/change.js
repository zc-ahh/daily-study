// pages/change/change.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
sno:'',
info:{
  sno:"",
  name:'',
  password:'',
  grade:'',
  major:'',
  class1:'',
  sex:'',
}
  },
  onsubmit:function(e){
    console.log("注册表单已提交")
    let sno=this.data.sno
    let info=e.detail.value
    var that=this
    if(info.name==''||info.password==''){
      wx.showToast({
        title: '姓名、密码不允许为空',
        icon:'none'
      })
    }
    else{
    this.setData({
      'info.sno':sno,
      'info.name':info.name,
      'info.password':info.password,
      'info.major':info.major,
      'info.grade':info.grade,
      'info.class1':info.class1,
      'info.sex':info.sex,
    })
    console.log(this.data.info)
    wx.request({
      url: 'http://localhost:8080/exam/updateuser',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        sno:sno,
        name:info.name,
        password:info.password,
        major:info.major,
        grade:info.grade,
        class1:info.class1,
        sex:info.sex,
      },
      success:function(e){
        if(e.data=="成功"){
        wx.navigateTo({
          url: '/pages/login/login?message=修改成功!',
        })
      }
      else{
        wx.navigateTo({
          url: '/pages/login/login?message=注册失败，账号已注册!',
        })
      }
      }
    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.sno)
    this.setData({
      sno:options.sno
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