// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop', 'new', 'sell'];
const TOP_DISTANCE = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMultiData();
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');

  },
  onShow: function () {
    let aa = getCurrentPages();
    console.log(aa)
  },


  //........................网络请求函数........................
  _getMultiData() {
    getMultiData().then(res => {
      //取出轮播图数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      //赋值上去
      //因为这是动态数据,所以用this.setData
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      //三个type的分别的list
      const list = res.data.data.list;
      //为了防止频繁的调用setData,所以使用先拿出旧的数据,再push上去新的数据
      const oldlist = this.data.goods[type].list;
      //push上去的是每一个对象,而不是整一个数组
      oldlist.push(...list);
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldlist,
        //跟上传入服务器上的page
        [pageKey]: page
      })
    })
  },

  //...........................事件监听函数.............................
  handleTabClick(e) {
    //取出用户点的哪个类型的index
    const index = e.detail.index;
    //动态传入类型
    this.setData({
      currentType: types[index]
    })
  },
  //监听图片加载完，测出来的高度
  handleImageLoad() {
    // 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替。
    const query = wx.createSelectorQuery();
    query.select('#tab-control').boundingClientRect(rect => {
      console.log(rect)
      //这里不需要动态改变数据上去，所以不用setData();
      this.data.tabScrollTop = rect.top

    }).exec()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getGoodsData(this.data.currentType)
  },
  //页面滚动的时候触发这个事件
  onPageScroll: function (option) {
    const scrollTop = option.scrollTop;
    //   // 2.修改showBackTop属性
    // 官方: 不要再滚动的函数回调中频繁的调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE; //返回true还是false赋值给一个变量
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })

    }
    // 修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }

  }



})