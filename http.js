/**
  * 封装http 请求方法
*/
const apiUrl = "https://amzs.esells.cn/api/"; 
const http = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: params.header || {
        "Content-Type": "application/json",//设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
        "token": "d0cf8b53-755e-4c3b-ba2f-6c8ebffe6e35",
        "loginName": "admin",
      },
      method: params.method || 'POST',//默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,//响应的数据类型
      success: function(res) {
        //接口访问正常返回数据
        if (res.data.success) {
          resolve(res.data)
          // if (res.data.retCode == "000000") {
          //   resolve(res.data)
          // } else if (params.url == "/order/result" && res.data.retCode == "800020") {//支付结果未知      
          //   //需要特殊处理的接口，可以单独列出来返回数据
          //   resolve(res.data)
          // } else {
          //    wx.showToast({
          //     icon: "none",
          //     title: res.data.retMsg
          //   })       
          // }
        } else {
          var errMsg = res.data.message || '调用接口出错了'
          errorToast(errMsg)
        }
      },
      fail: function(e) {
        errorToast(e);
        reject(e)
      }
    })
  })
}

function errorToast(errMsg){
  wx.showModal({
    title: '错误',
    content: errMsg,
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

module.exports = {
  http: http
}