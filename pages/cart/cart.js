// pages/cart/cart.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal
} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addCart: [],
    // 收货地址
    address: {},
    //全选
    allChecked: true,
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0,



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  // ---------------------获取用户地址---------------------------
  // handelChooseAddress(){
  //   wx.getSetting({
  //     success: (result) => {
  //       const scopeAddress = result.authSetting["scope.address"];
  //       console.log(scopeAddress);
  //       if (scopeAddress === true || scopeAddress === undefined){
  //         wx.chooseAddress({
  //           success: (res1) => {
  //             let address = res1;
  //             this.setData({
  //               address
  //             })
  //           }
  //         })
  //       }else{
  //         wx.openSetting({
  //           success: (res2) => {
  //             wx.chooseAddress({
  //               success: (res3) => {
  //                 let address = res3;
  //                 this.setData({
  //                   address
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }

  //     }
  //   })
  // },
  //拿地址
  async handelChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        // 先诱导用户打开授权页面
        await openSetting();
      }
      //4、调用获取收货地址的 api
      const res2 = await chooseAddress();
      //将获取到的 地址值存储到本地缓存中
      wx.setStorageSync('address', res2);
    } catch (err) {
      console.error(err)
    }
  },
  //改变商品数量
  async operationGoods(e) {
    const goodsid = {
      id: e.detail.id,
      operation: e.detail.operation
    }
    let {
      addCart
    } = this.data;
    let {
      id,
      operation
    } = goodsid;
    let index = addCart.findIndex(item => item.iid === id);
    if (addCart[index].count === 1 && operation === -1) {
      const res = await showModal({
        content: '您是否要删除该商品！'
      });
      if (res.confirm) {
        addCart.splice(index, 1);
        this.setData({
          addCart
        });
        wx.setStorageSync('addCart', this.data.addCart);
        //计算购物车
        this.setCart(addCart);
      }
    } else {
      addCart[index].count += goodsid.operation;
      //计算购物车
      this.setCart(addCart);

    }
  },
  // 单选框的 选中与取消的触发事件
  checkedChange(e) {
    let goods_id = e.detail;
    let {
      addCart
    } = this.data;
    //寻找出选中的id和购物车的id匹配
    let index = addCart.findIndex(item => item.iid === goods_id)
    //找到后去反，
    addCart[index].checked = !addCart[index].checked;
    this.setCart(addCart);


  },
  //点击全选子组件返回来，监听事件
  allCheckedChange() {
    let {
      addCart,
      allChecked
    } = this.data; //取出来的addCart是数组, allChecked是布尔值
    allChecked = !allChecked;
    addCart.map(v => v.checked = allChecked);
    this.setCart(addCart);


  },

  //设置购物车状态同时，重新计算底部的工具栏的数据 全选 总价格 购买数量
  setCart(cart) {
    //重新定义全选框
    const allChecked = cart.length > 0 ? cart.every(item => item.checked) : false;
    console.log(allChecked)
    //计算数量
    let totalNum = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      if (item.checked) {
        let newPrice = (item.newPrice).slice(1);
        totalPrice += parseInt(newPrice) * item.count;
        totalNum += item.count;
      }
    });
    this.setData({
      addCart: cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('addCart', cart);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   * 这时候可以拿到data数据
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //1、获取 缓存中的收货地址信息
    const address = wx.getStorageSync('address');
  
    this.setData({
      address,
    });
    const addCart = wx.getStorageSync('addCart') || [];
    //检验购物车是否存在数据
    this.setCart(addCart);
   
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})