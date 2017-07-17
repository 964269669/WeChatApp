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
  }

  
})


