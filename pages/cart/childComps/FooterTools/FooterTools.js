// pages/cart/childComps/FooterTools/FooterTools.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allChecked:{
      type: Boolean,
    },
    totalPrice: {
      type: Number,
      value:0
    },
    totalNum: {
      type: Number,
      value: 0
    }
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
    allCheckedChange(){
      this.triggerEvent('allCheckedChange', {})
    }
  }
})
