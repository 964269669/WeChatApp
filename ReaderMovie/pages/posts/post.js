var postsData=require('../../data/posts-data.js')

Page({
  data:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.data.postList=postsData.postList;
    // console.log(this.data.postList);
    //相当于把json中的数据放到了data数据中
    this.setData({
      posts_key:postsData.postList
    })
  },
  onPostTap:function(event){
    //获取data-postId属性值  所有自定义属性集合dataset;
    //在页面写的data-postId,在dataset中会把整个单词转成小写，除非用连字符-连接的两个单词，到了dataset总才是驼峰形式
    var postId=event.currentTarget.dataset.postid;
    // console.log("postTap函数"+postId)
    wx.navigateTo({
      url:"post-detail/post-detail?id="+postId
    })
  }

  
})


