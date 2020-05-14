// pages/category/childCpns/w-tab-menu/w-tab-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,

  },
 

  /**
   * 组件的方法列表
   */
  methods: {
    itemIndex(e) {
      let itemIndex = e.currentTarget.dataset.index;
      this.triggerEvent('itemIndex', itemIndex, {})
      this.setData({
        currentIndex: itemIndex
      })

    },
    scroll_distance(e){
      console.log(e);
    }
    
  }
})