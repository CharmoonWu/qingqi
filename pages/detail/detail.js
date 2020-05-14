// pages/detail/detail.js

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from '../../service/detail.js'
const TOP_DISTANCE = 1000;
const numList = [];
let detailInformationList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: null,
    titles: ['商品', '参数', '评论', '推荐'],
    topImages: [],
    goods: {},
    shop: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommendList: [],
    backTop: false,
    // 创建购物车信息
    detailInformationList: []

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.iid)
    const detailIid = options.iid;
    this.setData({
      iid: detailIid
    })
    this._getDetail(this.data.iid);

  },
  // ================================网络请求函数===============================
  _getDetail(iid) {
    getDetail(iid).then(res => {
      // 拿出基本信息的集合
      if (res.statusCode === 200) {
        const data = res.data.result
        // 详情页轮播图
        const topImages = data.itemInfo.topImages
        // 基本信息
        const goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        // 描述信息
        const shop = new Shop(data.shopInfo);
        //商品的详细信息
        const detailInfo = data.detailInfo;
        //获取参数的信息
        const paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        let commentInfo = {};
        if (data.rate.list) {
          commentInfo = data.rate.list[0];
        }
        //回调详情页的
        // const recommendList = [];
        getRecommend().then(res => {
          const recommendList = res.data.data.list

          this.setData({
            recommendList
          })
        })
        // 动态改变data的值
        this.setData({
          topImages,
          goods,
          shop,
          detailInfo,
          paramInfo,
          commentInfo,
        });
      } else {
        wx.reLaunch({
          url: '/notFind/notFind/notFind'
        })
      }
    })

  },
  // 滚动事件
  onPageScroll: function(option) {
    const scrollTop = option.scrollTop;
    const flag1 = scrollTop >= TOP_DISTANCE;
    if (flag1 != this.data.backTop) {
      this.setData({
        backTop: flag1
      })
    }
  },
 
  // --------加入购物车事件------------
  addCart() {
    let detailArray = {
      iid: this.data.iid,
      topImages: this.data.topImages[0],
      goodsTitle: this.data.goods.title,
      newPrice: this.data.goods.newPrice,
      logo: this.data.shop.name
    }

    // 判断将要添加的信息，是否在list里面也有，没有的话就直接添加
    let checkDetailArray = detailInformationList.find(v => v.iid === detailArray.iid);
    if (!checkDetailArray) {
      detailArray['count'] = 1;
      detailArray['checked'] = true;
      detailInformationList.push(detailArray);
    } else {
      //否则在原有的list上寻找对应的iid的商品 +1
      let exisproducts = detailInformationList.find(v => v.iid === detailArray.iid)
      exisproducts.count += 1;
    }
    //最后响应式的更新data数据
    this.setData({
      detailInformationList
    })
    //把最后的商品数据存到setStorageSync
    wx.setStorageSync('addCart', detailInformationList);
  }
})