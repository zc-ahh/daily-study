// pages/login/login.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    message:''
  },
  onSubmit:function(e){
    var that=this
    console.log("信息已提交")
    console.log(e.detail.value)
    let sno=e.detail.value.sno
    let password=e.detail.value.password
    console.log(sno,password)
    wx.request({
      url: 'http://localhost:8080/exam/getuser',
      data:{
        sno:sno
      },
      success:function(e){
        console.log(e.dada)
        if(e.data[0]){
        that.setData({
          info:e.data[0]
        })
      }
        else{
          console.log("失败")
          wx.navigateTo({
            url: '/pages/login/login?message=账号或者密码错误',
          })
      }
      if(sno==that.data.info.sno&&password==that.data.info.password){
      console.log('成功')
      app.globalData.info=that.data.info
      app.globalData.state="已登录"
     wx.switchTab({
       url: '/pages/person/person',
     })
   }
      else{
        console.log("失败")
        wx.navigateTo({
          url: '/pages/login/login?message=账号或者密码错误',
        })
      }
        console.log(that.data.info)
      }
    })
  },
  onReset:function(e){
    console.log("表单已重置")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
this.setData({
  message:e.message
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