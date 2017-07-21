//获取全局变量
var app=getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    coming_soon:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl=app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl=app.globalData.doubanBase+"/v2/movie/coming_soon"+"?start=0&count=3";
    var top250Url=app.globalData.doubanBase+"/v2/movie/top250"+"?start=0&count=3";
    
    this.getMovieListData(inTheatersUrl,"inTheaters");
    this.getMovieListData(comingSoonUrl,"coming_soon");
    this.getMovieListData(top250Url,"top250");
  },
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
        that.processDoubanData(res.data)
      },
      fail:function(){
        console.log("失败")
      }
    })
  },

  processDoubanData:function(moviesDouban){
    var movies=[];
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp={
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      };
      movies.push(temp);
    }

    var readyData={};
    readyData[settedKey]=movies;
    this.setData(readyData);
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