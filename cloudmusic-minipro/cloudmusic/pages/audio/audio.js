// pages/audio/audio.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[{src:"/pages/images/banner/01.jpg",id:1394169337,name:'我和我的祖国'},
    {src:"/pages/images/banner/02.jpg",id:288966,name:'我的祖国'},
    {src:"/pages/images/banner/03.jpg",id:1410381512,name:'宠爱'},
    {src:"/pages/images/banner/04.jpg",id:346089,name:'海阔天空'},
    {src:"/pages/images/banner/05.jpg",id:346576,name:'光辉岁月'},
    {src:"/pages/images/banner/06.jpg",id:26569168,name:'stronger'},
    {src:"/pages/images/banner/07.jpg",id:1306925085,name:'glad you came'},
    {src:"/pages/images/banner/08.jpg",id:28329963,name:'whistle'},
    {src:"/pages/images/banner/09.jpg",id:26524402,name:'恶人'},
    {src:"/pages/images/banner/10.jpg",id:25864480,naem:'隐身守候'},
  ],
    number:0,
    Src:'/pages/images/play.png',
    fancy:[],
    alltime:0,
    currentvalue:0,
    duration:'00:00',
    currentTime:'00:00',
    id:0,
    value:[0],
    value1:[0],
    poster:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=411955657,1051847389&fm=26&gp=0.jpg',
    result:'',
    name:' ',
    author:" ",
    songinfo:{
      name:'',
      id:'',
      author:''
    },
    songallinfo:[],
    historysong:[],
    src:'http://m10.music.126.net/20201115120751/0a364b3284f626c828b8a862b02ef814/ymusic/76e5/ba34/d562/2e95d6640354faee9ef0d6a384d2bc5f.mp3'
  },
  formatTime(s){
    let t=''
    s=Math.floor(s)
    if(s>-1){
      let min=Math.floor(s/60)%60
      let sec=s%60
      if(min<10){
        t=t+'0'
      }
      t+=min+':'
      if(sec<10){
        t=t+'0'
      }
      t=t+sec
    }
    return t
  },
  play(e){
    let name=e.currentTarget.dataset.name
    var that=this
    wx.request({
      url: 'http://neteasecloudmusicapi.zhaoboy.com/search',
      data:{
       keywords:name
      },
      success:function(e){
        let id=e.data.result.songs[0].id
        let author=e.data.result.songs[0].artists[0].name
        wx.request({
          url: 'http://neteasecloudmusicapi.zhaoboy.com/song/url',
          data:{
            id:id
          },
          fail:function(e){
            wx.showToast({
              title: '找不到合适资源',
            })
          },
          success:function(e){
            if(e.data!=null){
            let src=e.data.data[0].url
          that.setData({
            src:src,
            name:name,
            id:id,
            author:author
          })
          that.audioplay()
        }
        else{
          wx.showToast({
            title: '找不到合适资源',
          })
        }
      }
        })
      }
    })
        
  },
  currenttime(e){
    let duration=this.formatTime(e.detail.duration)
    let currentTime=this.formatTime(e.detail.currentTime)
    this.setData({
      duration:duration,
      currentTime:currentTime,
      alltime:Math.floor(e.detail.duration),
      currentvalue:Math.ceil(e.detail.currentTime)
    })
  },
  sliderChange(e){
    let time=e.detail.value
    this.audioCtx.seek(time)
    this.setData({
      currentTime:this.formatTime(e.detail.value)
    })
  },
  sliderchanging:function(e){
    
  },
  musicBlur:function(e){
    this.name=e.detail.value
  },
  pickerchange1:function(e){
    let v=e.detail.value
    let songinfo=this.data.historysong[v]
    let name=this.data.historysong[v].name
    let author=this.data.historysong[v].author
    let id=this.data.historysong[v].id
    console.log(name,id,author)
    this.setData({
      author:author,
      id:id,
      name:name,
      songinfo:songinfo
    })
  },
  pickerviewchange:function(e){
    let v=e.detail.value
    let songinfo=this.data.songallinfo[v[0]]
    let name=this.data.songallinfo[v[0]].name
    let author=this.data.songallinfo[v[0]].author
    let id=this.data.songallinfo[v[0]].id
    var that=this
    wx.request({
          url: 'http://neteasecloudmusicapi.zhaoboy.com/song/url',
          data:{
            id:id
          },
          fail:function(e){
            wx.showToast({
              title: '找不到合适资源',
            })
          },
          success:function(e){
            if(e.data!=null){
            console.log(e.data)
            let src=e.data.data[0].url
            console.log(src)
          that.setData({
            src:src
          })
        }
        else{
          wx.showToast({
            title: '找不到合适资源',
          })
        }
      }
        })
    this.setData({
      author:author,
      id:id,
      name:name,
      songinfo:songinfo
    })
  },
  surechange:function(e){
    this.audioplay()
    let songinfo=e.currentTarget.dataset.id
    let id=songinfo.id
    let name=songinfo.name
    console.log(e)
    let hs=this.data.historysong
    if(hs.length<=10&&songinfo!=null){
    hs.push(songinfo)
    }
    else{
      hs.splice(0,1)
      hs.push(songinfo)
    }
    console.log(hs)
    this.setData({
      historysong:hs
    })
},
  search:function(){
    let name=this.name
    var that=this
    if(name==''){
      wx.showToast({
        title:'音乐名不能为空',
        icon:'none'
      })
      }
      else{
        wx.request({
          url: 'http://neteasecloudmusicapi.zhaoboy.com/search',
          data:{
           keywords:name
          },
          success:function(e){
            let songallinfo=[]
            for(let i=0;i<=20;i++){
              var songinfo={
              name:e.data.result.songs[i].name,
              id:e.data.result.songs[i].id,
              author:e.data.result.songs[i].artists[0].name
              }
              songallinfo.push(songinfo)
            }
            that.setData({
              songallinfo:songallinfo
            })
          }
        })
    }
  },
  preserve(e){
    var that=this
    let fancy=[]
    let info=app.globalData.info
    let key=info.sno
    let songinfo=e.currentTarget.dataset.id
    try{
      var value=wx.getStorageSync(key)
      if(value){
        var songInfo={
          name:songinfo.name,
          id:songinfo.id,
          author:songinfo.author
          }
          value.push(songInfo)
        wx.setStorage({
          key: key,
           data: value,
           success:function(e){
             wx.showToast({
               title: '收藏成功',
               icon:'nono'
             })
           }
         })
        }
         else{
            var songInfo1={
            name:songinfo.name,
            id:songinfo.id,
            author:songinfo.author
            }
            fancy.push(songInfo1)
          wx.setStorage({
            key: key,
             data: fancy,
             success:function(e){
              wx.showToast({
                title: '收藏成功',
                icon:'nono'
              })
            }
           })
      }
    }
    catch(e){
      console.log(e)
    }
   
  },
  audioplay:function(e){
    this.audioCtx.play()
  },
  audiopause:function(e){
    let nub=this.data.number
    if(nub%2==0){
      this.audioCtx.pause()
      nub=nub+1
      this.setData({
        Src:'/pages/images/play.png',
        number:nub
      })
    }
    else{
      this.audioCtx.play()
      nub=nub+1
      this.setData({
        Src:'/pages/images/pause.png',
        number:nub
      })
    }
    
  },
  audioseek:function(e){
    this.audioCtx.seek(0)
  },
  onReady:function(){
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


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