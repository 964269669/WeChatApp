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

    // var postsCollected={
    //   1:true,
    //   2:false,
    //   3:true
    // }
    
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
  onCollectionTap:function(event){
    var postsCollected=wx.getStorageSync("posts_collected");
    var postCollected=postsCollected[this.data.currentPostId];
    //收藏变成未收藏  未收藏变成收藏
    postCollected=!postCollected;
    postsCollected[this.data.currentPostId]=postCollected;
    //更新文章是否缓存
    wx.setStorageSync("posts_collected",postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected:postCollected
    })
  }
  
})







