import {
  baseURL
} from './config.js'
export default function request(option) {
  return new Promise((res, rej) => {
    wx.request({
      url: baseURL + option.url,
      method: option.method || 'get',
      data: option.data || {},
      timeout: 5000,
      success: res,
      fail: rej
    })
  })
}