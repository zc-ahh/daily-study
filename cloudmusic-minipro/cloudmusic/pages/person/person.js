// pages/person/person.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:[0,0,0],
info:null,
state:'请登录',
fancy:''
  },
  infochange(){
    let sno=this.data.info.sno
    console.log(sno)
    wx.navigateTo({
      url: '/pages/change/change?sno='+sno,
    })
  },
  exit:function(){
    wx.showModal({
      title:'提示',
      content:'是否确认退出',
      cancelColor: 'gray',
      success:function(e){
        app.globalData.info =null
        app.globalData.state = ''
        if(e.confirm){
        wx.navigateTo({
          url: '/pages/start/start',
        })

      }
      else if(e.cancel){
        console.log('取消退出')
      }
      }
    })
    
  },
  refresh:function(){
    var that=this
    var info=app.globalData.info
    let key=info.sno
    var state=app.globalData.state
    if(info!=null){
      wx.getStorage({
        key: key,
        success:function(e){
          console.log(e.data)
          that.setData({
            fancy:e.data
          })
        }
      })
    console.log(info)
    let state='已登录'
    this.setData({
      info:info,
      state:state,
    })
  }
  },
  login:function(){
    wx.navigateTo({
      url: '/pages/start/start',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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