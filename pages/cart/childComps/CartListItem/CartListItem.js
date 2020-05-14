// pages/cart/childComps/CartListItem/CartListItem.js
import {
  showModal
} from '../../../../utils/asyncWx.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: {
      type: Array,
      value: []
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
    operationGoods(e) {
      const goodsid = {
        id: e.currentTarget.dataset.id,
        operation: e.currentTarget.dataset.operation
      }
      this.triggerEvent('operationGoods', goodsid,{});
    },
    checkedChange(e){
      const goods_id = e.currentTarget.dataset.id;
      this.triggerEvent('checkedChange', goods_id,{})
    }
  }
})