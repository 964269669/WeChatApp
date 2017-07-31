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

module.exports={
  convertToStarsArray:convertToStarsArray
}














