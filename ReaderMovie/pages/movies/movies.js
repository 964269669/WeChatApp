//获取全局变量
var app=getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // inTheaters:{},
    // coming_soon:{},
    // top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //三个分类数据的地址
    var inTheatersUrl=app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl=app.globalData.doubanBase+"/v2/movie/coming_soon"+"?start=0&count=3";
    var top250Url=app.globalData.doubanBase+"/v2/movie/top250"+"?start=0&count=3";
    
    this.getMovieListData(inTheatersUrl,"inTheaters");
    this.getMovieListData(comingSoonUrl,"coming_soon");
    this.getMovieListData(top250Url,"top250");
  },
  //发送请求获取数据
  getMovieListData:function(url,settedKey){
    var that=this;
    //小程序请求用这个
    wx.request({
      url: url,
      method:"GET",
      //这里写"Content-Type":"application/xml"，能行，写成"Content-Type":""也能行，估计写成其他的也可以唯独写成json报错,也许是豆瓣的问题
      header:{
        "Content-Type":"application/xml"
      },
      success:function(res){
        console.log(res.data);
        //成功的回调中调用处理数据的函数
        that.processDoubanData(res.data,settedKey)
      },
      fail:function(){
        console.log("失败")
      }
    })
  },
  //处理数据的函数
  processDoubanData:function(moviesDouban,settedKey){
    var movies=[];
    //遍历三条电影数据对象数组
    for(var idx in moviesDouban.subjects){
      //当前电影条目
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp={
        title:title,//电影名称
        average:subject.rating.average,//评分
        coverageUrl:subject.images.large,//封面
        movieId:subject.id//编号
      };
      movies.push(temp);
    }

    //利用js对象动态特性
    var readyData={};
    readyData[settedKey]={
      movies:movies
    };
    this.setData(readyData);
    console.log(readyData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})