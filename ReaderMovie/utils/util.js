function convertToStarsArray(stars){
 // stars是传递过来的数字 传递过来的是几array数组中
 // 前几个就是1后面都是0(我们用1表示实心星星，0表示空心星星)
 // array数组中存储的是1或者0
  var num=stars.toString().substring(0,1);
  var array=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

//发送请求获取数据
function http(url,callback){
    wx.request({
      url: url,
      method:"GET",
      //这里写"Content-Type":"application/xml"，能行，写成"Content-Type":""也能行，估计写成其他的也可以唯独写成json报错,也许是豆瓣的问题
      header:{
        "Content-Type":"application/xml"
      },
      success:function(res){
        // console.log(res.data);
        //成功的回调中调用处理数据的函数
        callback(res.data);
      },
      fail:function(){
        console.log("失败")
      }
    })
}
  
module.exports={
  convertToStarsArray:convertToStarsArray,
  http:http
}














