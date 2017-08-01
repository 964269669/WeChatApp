var util = require('../../utils/util.js')

//获取全局变量
var app=getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //如果是对象 最好在这定义一下 赋初值
    inTheaters:{},
    coming_soon:{},
    top250:{},
    containerShow:true,
    searchPannelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //三个分类数据的地址
    var inTheatersUrl=app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl=app.globalData.doubanBase+"/v2/movie/coming_soon"+"?start=0&count=3";
    var top250Url=app.globalData.doubanBase+"/v2/movie/top250"+"?start=0&count=3";
    
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"coming_soon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣电影Top250");
  },
  //更多函数  传递当前点击的分类
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url:"more-movie/more-movie?category="+category
    })
  },

  //发送请求获取数据
  getMovieListData:function(url,settedKey,categoryTitle){
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
        that.processDoubanData(res.data,settedKey,categoryTitle)
      },
      fail:function(){
        console.log("失败")
      }
    })
  },
  //点击八叉关闭
  onCancelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false
      // searchResult:{}
    })
  },

  //获得焦点显示
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  //处理数据的函数
  processDoubanData:function(moviesDouban,settedKey,categoryTitle){
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

    //利用js对象动态特性
    var readyData={};
    readyData[settedKey]={
      movies:movies,
      categoryTitle:categoryTitle
    };
    this.setData(readyData);
    // console.log(readyData)
  }
})