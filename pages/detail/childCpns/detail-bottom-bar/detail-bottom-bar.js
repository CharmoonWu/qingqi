// pages/detail/childCpns/detail-bottom-bar/detail-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCart(){
      wx.showToast({
        title: '成功加入车队',
        icon: 'success',
        duration: 2000
      })
      this.triggerEvent('addCart', {})
    }
  }
})
