// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
import {
  POP,
  NEW,
  SELL
} from '../../utils/const.js';
const types = ['pop', 'new', 'sell'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    // 假装请求-1选项的数据
    currentIndex: 0,
    titles: ['流行', '新款', '精选'],
    currentType: 'pop',
    showTop: false,
    top_num: 0
    
  },
  rollUp(e){
    let rollUpScrollTop = e.detail.scrollTop;
    let showTop = false;
    showTop = rollUpScrollTop > 300 ? true : false;
    this.setData({
      showTop
    })
  },
  backtop(){
    this.setData({
      top_num: 0
    })
  },
  
  
  // 子组件点击后传递过来的索引
  itemIndex(e) {
    const currentIndex = e.detail;
    this._getSubcategories(currentIndex);
    this.setData({
      currentIndex
    })
  },
  // w-tab - control子组件传递过来的当前活跃的index
  handleTabClick(e){
    let handleTabIndex = e.detail.index; 
    let currentType = types[handleTabIndex];
    this.setData({
      currentType
    })
  
    // let currentType = 

  },

  // ---------------------请求数据的方法---------------------
  _getCategory() {
    getCategory().then(res => {
      const categories = res.data.data.category.list;
      const categoryData = {};
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: {},
          categoryDetail: {
            'pop': [],
            'new': [],
            'sell': []
          }
        }
      }
      this.setData({
        categories,
        categoryData
      })
      this._getSubcategories(0);

    })
  },
  // 右上模块
  _getSubcategories(index) {
    this.data.currentIndex = index;
    const mailKey = this.data.categories[index].maitKey;
    getSubcategory(mailKey).then(res => {
      console.log(res)
      let subcategoriesItem = res.data.data.list;
      // 不允许这样直接赋值，不然数据对不上
      // this.data.categoryData[index].subcategories = res.data.data.list;
      let subcategoriesKey = `categoryData[${index}].subcategories`
      const categoryData = {
        ...this.data.categoryData
      };
      this._getCategoryDetail(POP);
      this._getCategoryDetail(NEW);
      this._getCategoryDetail(SELL);

      this.setData({
        categoryData,
        [subcategoriesKey]: subcategoriesItem
      })


    })
  },
  // 右下模块
  _getCategoryDetail(type) {
    // 1: 获取请求的获取请求的miniWallkey
    const miniWallkey = this.data.categories[this.data.currentIndex].miniWallkey;
    // 2：发送请求数据，传入miniWallkey参数
    getCategoryDetail(miniWallkey, type).then(res => {
      const currentIndex = this.data.currentIndex;
      let categoryDetailKey = `categoryData[${currentIndex}].categoryDetail.${type}`;
      let categoryDetailItem = res.data;
      this.setData({
        [categoryDetailKey]: categoryDetailItem
      })

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //一加载就开始请求数据
    this._getCategory();
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
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