//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ceoItem:[
      'pages/active/commodityDetails.html?id=6720872735',
      'pages/active/commodityDetails.html?id=6720872735',
      'pages/active/commodityDetails.html?id=6720872735',
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getInfo: function(){
    app.http({url: 'Account/GetUserInfo'}).then( res => {
      console.log(res)
    })
  },
  skip: function(event){
    console.log(event.currentTarget.dataset.gid)
    wx.navigateToMiniProgram({
      appId: 'wxd1807fae7980b9df',
      path: 'pages/active/commodityDetails.html?id=6720872735',
      extraData: {
        id: '6720872735'
      },
      envVersion: 'develop',
      success(res) {
        console.log(5555)
      }
    })
  }
})
