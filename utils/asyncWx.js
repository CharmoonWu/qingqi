// Promise 形式封装微信小程序  getSetting
export function getSetting(){
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      },
    })
  })
}

// Promise 形式 的 chooseAddress

export function chooseAddress(){
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      },
      
    })
  })
}

// Promise 形式 的 openSetting
export function openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      },
    })
  })
}

// 弹窗提示 用户是否删除商品 Promise形式的 showModal
export function showModal({ content }){
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}