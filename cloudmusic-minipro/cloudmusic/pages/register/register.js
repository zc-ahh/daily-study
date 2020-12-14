// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name:'',
      sno:'',
      password:'',
      grade:'',
      major:'',
      class1:'',
      sex:'',
    }
  },
  onSubmit:function(e){
    console.log("注册表单已提交")
    let info=e.detail.value
    var that=this
    if(info.sno==''||info.name==''||info.password==''){
      wx.showToast({
        title: '学号、姓名、密码不允许为空',
        icon:'none'
      })
    }
    else{
    this.setData({
      'info.sno':info.sno,
      'info.name':info.name,
      'info.password':info.password,
      'info.major':info.major,
      'info.grade':info.grade,
      'info.class1':info.class1,
      'info.sex':info.sex,
    })
    console.log(this.data.info)
    wx.request({
      url: 'http://localhost:8080/exam/saveuser',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        sno:info.sno,
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
          url: '/pages/login/login?message=注册成功!',
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
  onReset:function(e){
    console.log('注册信息表单已重置')
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