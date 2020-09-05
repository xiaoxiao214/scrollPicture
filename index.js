
//封装一个ajax函数请求图片信息
function ajax(url,method,data,success,flag){
 var xhr = null;
 //此处是做兼容性处理，ie以上用的window.XMLHttpRequest
 if(window.XMLHttpRequest){
    xhr =new window.XMLHttpRequest();
 }else{
     xhr = new ActiveXObject('Microsoft.XMLHTTP');
 }
 xhr.onreadystatechange = function(){
     // 0 1 2 3 4
        // 0: 当前代理已经被创建  还没有调用open方法
        // 1： 调用了open方法 建立连接
        // 2： send方法已经被调用
        // 3： 代表正在接收响应信息  
        // 4： 代表响应数据全部发送完成
    if(xhr.readyState == 4 && xhr.status == 200){
        success(JSON.parse(xhr.responseText));
    } else{
        console.log('error');
    }
 }
 if(method == "GET"){
     xhr.open(method,url + '?' + data,flag);
     xhr.send();
    } else if(method == "POST"){
        xhr.open(type,url,flag);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
}

//请求图片信息
var lock= false;
function getData(){
    ajax('./server/data.json','GET',"",function(res){
        console.log(res)
        render(res);
        lock = false;
    },
        true
        )
}
//获取最小长度的列
function getMinHeight(){
    var Oli = document.getElementsByTagName('li');
    var minIndex= 0;
    var minHeight = Oli[0].offsetHeight;
    for(var i = 0;i < Oli.length;i++){
        if(Oli[i].offsetHeight < minHeight){
            minIndex = i;
            minHeight = Oli[i].offsetHeight;

        }
    }
    return{
        minIndex:minIndex,
        minHeight:minHeight
    }
}

//渲染页面
function render(res){
    var Oli = document.getElementsByTagName('li');
    var imgWidth = Oli[0].getElementsByClassName('item')[0].offsetWidth;
    for (var i = 0; i < res.length; i++) {
        var Odiv = document.createElement('div');
        Odiv.className = 'item';
        var Oimg = new Image();
        Oimg.src = res[i].img;
        // oImg.width / oImg.height = res[i].width / res[i].height 
        Oimg.height = imgWidth * res[i].height / res[i].width;
        var Op = document.createElement('p');
        Op.innerHTML = res[i].desc;
        Odiv.appendChild(Oimg);
        Odiv.appendChild(Op);
        var index = getMinHeight().minIndex;
        Oli[index].appendChild(Odiv);
    }
    
}
//滚动滚动获取图片继续渲染

window.onscroll = function(e){
    //判断最短列是否出现空白
    var clientHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop;
    var minHeight = getMinHeight().minHeight;
    if(minHeight < clientHeight + scrollTop){
        if(!lock){
            lock = true;
            getData();
        }
    }
}
getData();