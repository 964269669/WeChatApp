var postsData=require('../../../data/posts-data.js')
Page({
  data:{

  },
  onLoad:function(option){
    var postId=option.id;
    var postData=postsData.postList[postId];
    console.log(postData);
    // this.data.postData=postData;
    this.setData({
      postData_key:postData
    })
  }
})







