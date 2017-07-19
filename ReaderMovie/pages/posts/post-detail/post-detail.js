var postsData=require('../../../data/posts-data.js')
Page({
  data:{

  },
  onLoad:function(option){
    var postId=option.id;
    //中转postId
    this.data.currentPostId=postId;
    //获取列表数据
    var postData=postsData.postList[postId];
    // this.data.postData=postData;
    this.setData({
      postData_key:postData
    });

    var postsCollected=wx.getStorageSync("posts_collected")
    if(postsCollected){
      var postCollected=postsCollected[postId];
      //将collected和布尔值postCollected绑定
      this.setData({
        collected:postCollected
      })
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync("posts_collected",postsCollected);
    }
    
  },
  //收藏功能
  onCollectionTap:function(event){
    this.getPostsCollectedSyc();
    // this.getPostsCollectedAsy();
  },
  //异步方法
  getPostsCollectedAsy:function(){
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
  },

  //同步方法
  getPostsCollectedSyc:function(){
    var postsCollected=wx.getStorageSync("posts_collected");
    var postCollected=postsCollected[this.data.currentPostId];
    //收藏变成未收藏  未收藏变成收藏
    postCollected=!postCollected;
    postsCollected[this.data.currentPostId]=postCollected;
    this.showToast(postsCollected,postCollected);
  },

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
  },
  showToast:function(postsCollected,postCollected){
    //更新文章是否缓存
    wx.setStorageSync("posts_collected",postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected:postCollected
    });

    //收藏文字提示
    wx.showToast({
      title:postCollected ? "收藏成功" : "取消收藏",
      duration:1000,
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
      itemColor:"#f00",
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
    console.log(1);
    wx.playBackgroundAudio({
      //本地文件不可以 必须是网络流媒体
      dataUrl:"http://ws.stream.qqmusic.qq.com/C100000Zn0vS4fKKo8.m4a?fromtag=38",
      title:"沉默是金-",
      coverimgUrl:"http://y.gtimg.cn/music/photo_new/T002R150x150M000003at0mJ2YrR2H.jpg?max_age=2592000"
    })
  }
  
})







