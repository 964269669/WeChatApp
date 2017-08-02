//获取全局变量
var app=getApp();
var util = require('../../../utils/util.js');


Page({

  /*页面的初始数据*/
  data: {
    movies:{},
    navigateTitle:"",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    //从获取的分类名称
    var category=options.category;
    this.data.navigateTitle=category;
    var dataUrl="";
    
    switch(category){
      case "正在热映":dataUrl=app.globalData.doubanBase+"/v2/movie/in_theaters" ;
        break;
      case "即将上映":dataUrl=app.globalData.doubanBase+"/v2/movie/coming_soon";
        break;
      case "豆瓣电影Top250":dataUrl=app.globalData.doubanBase+"/v2/movie/top250";
        break;
    } 
    //中转请求地址
    this.data.requestUrl=dataUrl;
    //请求数据函数
    util.http(dataUrl,this.processDoubanData);
  },

  //上滑加载更多
  onScrollLower:function(event){
    //更新请求开始条目
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    util.http(nextUrl,this.processDoubanData);
    //加载更多提示
    wx.showNavigationBarLoading();
  },
  //下拉刷新
  onPullDownRefresh:function(event){
    var refreshUrl=this.data.requestUrl+"?start=0&count=20";
    //刷新时要清空数据改变状态
    this.data.movies={};
    this.data.totalCount=0;
    this.data.isEmpty=true;

    //请求数据函数
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  //处理数据的函数
  processDoubanData:function(moviesDouban){
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
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,//电影名称
        average:subject.rating.average,//评分
        coverageUrl:subject.images.large,//封面
        movieId:subject.id//编号
      };
      movies.push(temp);
    }

    var totalMovies={};   
    //如果不是第一次加载
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }else{
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    //更新绑定数据
    this.setData({
      movies:totalMovies
    });
    //当前条目数 
    this.data.totalCount+=20;
    //隐藏加载更多提示
    wx.hideNavigationBarLoading();
    //停止下拉刷新
    wx.stopPullDownRefresh();
    
  },
  onReady:function(event){
    //设置导航栏标题
    wx.setNavigationBarTitle({
      title:this.data.navigateTitle,
    })
  }

  
  
})