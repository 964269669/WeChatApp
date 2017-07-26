var postsData=require('../../../data/posts-data.js');
var app=getApp();//拿到全局app变量

Page({
  data:{
    isPlayingMusic:false
  },
  onLoad:function(option){
    var globalData=app.globalData;
    //获取从post.wxml中传过来的参数
    var postId=option.id;
    //中转postId
    this.data.currentPostId=postId;
    //获取列表数据
    var postData=postsData.postList[postId];
    // this.data.postData=postData;
    this.setData({
      postData_key:postData
    });

    //读取缓存状态
    var postsCollected=wx.getStorageSync("posts_collected")
    if(postsCollected){
      var postCollected=postsCollected[postId];
      //将collected与postCollected绑定
      this.setData({
        collected:postCollected
      })
    }else{
      //设置当前收藏状态是false
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync("posts_collected",postsCollected);
    }

    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
      this.setData({isPlayingMusic:true})
    }
    this.setMusicMonitor();
    
  },

  setMusicMonitor:function(){
    //监听音乐事件
    var that=this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({isPlayingMusic:true})
    });
    app.globalData.g_isPlayingMusic=true;
    app.globalData.g_currentMusicPostId=that.data.currentPostId;

    wx.onBackgroundAudioPause(function(){
      that.setData({isPlayingMusic:false})
    });
    app.globalData.g_isPlayingMusic=false;
    app.globalData.g_currentMusicPostId=null;
  },

  //收藏功能
  onCollectionTap:function(event){
    this.getPostsCollectedSyc();
    // this.getPostsCollectedAsy();
  },
  //异步方法
  /*getPostsCollectedAsy:function(){
    var that=this;
    wx.getStorage({
      key:"posts_collected",
      success:function(res){
        var postsCollected=res.data;
        var postCollected=postsCollected[that.data.currentPostId];
        //收藏变成未收藏  未收藏变成收藏
        postCollected=!postCollected;
        postsCollected[that.data.currentPostId]=postCollected;
        that.showToast(postsCollected,postCollected);
      }
    })
  },*/

  //同步方法
  getPostsCollectedSyc:function(){
    var postsCollected=wx.getStorageSync("posts_collected");
    //从中转的postId获得状态
    var postCollected=postsCollected[this.data.currentPostId];
    //收藏变成未收藏  未收藏变成收藏
    postCollected=!postCollected;
    postsCollected[this.data.currentPostId]=postCollected;

    //更新文章是否缓存
    wx.setStorageSync("posts_collected",postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected:postCollected
    });
    this.showToast(postsCollected,postCollected);
  },

  /*
    //交互反馈：模态弹框
   showModal:function(postsCollected,postCollected){
    var that=this;
    wx.showModal({
      title:"收藏",
      content:postCollected ? "收藏该文章？":"取消收藏该文章？",
      showCancel:"true",
      cancelText:"取消",
      cancelColor:"#333",
      confirmText:"确认",
      confirmColor:"#405f80",
      success:function(res){
        if(res.confirm){
          //更新文章是否缓存
          wx.setStorageSync("posts_collected",postsCollected);
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected:postCollected
          });
        }
      }
    })
  },*/
  //收藏文字提示功能
  showToast:function(postsCollected,postCollected){
    //收藏文字提示
    wx.showToast({
      title:postCollected ? "收藏成功" : "取消收藏",
      duration:3000,
      icon:"success"
    })
  },
  //分享功能
  onShareTap:function(){
    var itemList=[
        "分享给微信好友","分享到朋友圈","分享给QQ好友","分享到QQ空间" 
      ];
    wx.showActionSheet({
      itemList:itemList,
      itemColor:"#405f80",
      success:function(res){
        // wx.showModal({
        //   title:"用户"+itemList[res.tapIndex],
        //   content:"用户是否取消？"+res.cancel
        // })
      }
    })
  },
  //音乐功能
  onMusicTap:function(event){
    //获取当前postId
    var currentPostId=this.data.currentPostId;
    var postData=postsData.postList[currentPostId];
    var isPlayingMusic=this.data.isPlayingMusic;
    //如果正在播放就停止
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      //更新绑定数据
      this.setData({
        isPlayingMusic:false
      })
    }else{
      wx.playBackgroundAudio({
        //本地文件不可以 必须是网络流媒体
        dataUrl:postData.music.url,
        title:postData.music.title,
        coverimgUrl:postData.music.coverImg
      })
      //更新绑定数据
      this.setData({
        isPlayingMusic:true
      })
    
    }
    
  }
  
})







