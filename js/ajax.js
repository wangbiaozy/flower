//自定义参数；电话号码
var isSubmib = false;
var myUrl = "http://183.240.150.230:3389/userexperience/blacklist5"//
var a1,c1,d1,f1,s1;
//a1为判断是否黑名单还是普通人，0未否，1为是
//c1用户是否中奖
//d1是否成长值 点击次数
//f1判断中过什么奖品
//s1判断有否中过视频券
//图片预加载
preloadimg(['img/bg.jpg'])
function preloadimg(array){  
    var newimg=[];  
    for(var i=0;i<array.length;i++){  
         newimg[i]=new Image();  
         newimg[i].src=array[i];  
   }  
} 



function openBg(){
	if(resCode==0){
		if(telephone==""||telephone==null){
			alert("没电话号码");
			$("#loading").remove();
			$('.page01').addClass('cur').removeClass('hide').show();
		}else{
			//alert("存在号码");
			pdZFB();
		}
	}else{
		$("#loading").remove();
		$('.page01').addClass('cur').removeClass('hide').show();
	}
}


//支付宝判断方法
function pdZFB(){ 
	//console.log(window.navigator.userAgent);
	if(isZFB()){
		console.log("支付宝");
		insert(telephone);
	}else{
		console.log("-----不在支付宝里面-----");
		//不在支付宝上应该打开的链接  正式的话打开下面3个最后面的隐藏
		/*$("#loading").hide();
		$('.page01').addClass('cur').removeClass('hide').show();
		$('.show_txt').show();*/
		insert(telephone);
	}
	
} 
function isZFB(){
	var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/AlipayClient/i) =='alipayclient'){ 
			return true; 
		}else{ 
			return false; 
		} 
}


//地址栏参数传入页面
function getQueryString(name) {                                       //name为传入参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");     
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;						
}

var resCode = '1';
var telephone = '13612341234';
console.log("resCode的赋值为"+resCode+",telephone的赋值为"+telephone);

//先保存电话号码一个 无论他是否黑名单  
function insert(telephone){
    $('.tc,.tc_13').show();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/insert",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.insert=="插入点击成功。"){
				$('.tc,.tc_13').show();
			}
			console.log('ps:用户号码保存成功');
			query(telephone);
		}
	});
}

//第一步查询是否黑名单,判断是否能参与活动
function query(telephone){
    Lucky(telephone);
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/check",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data.state);
			if(data.state == true){
				a1 = 0;//解除黑名单默认为0
				console.log('一,此人为黑名单,a1='+a1+'');
				Lucky(telephone);
			}else{
				a1 = 1;
				console.log('一,此人为普通人,a1='+a1+'');
				Lucky(telephone);
			}
		}
	});
};

//第二步查询是否中过奖
function Lucky(telephone){
    searchvid(telephone);
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/search",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.state == false){
				c1 = 0;
				f1 = 0
				console.log("二.还没中过奖，奖品名称为c1="+c1+",还没中过奖f1="+f1);
			}else{
				f1 = data.state;
				c1 = 1;
				console.log("二.提醒已经领取奖品c1="+c1+",已经中过奖f1="+f1);
			}
			searchvid(telephone);
		}
	});
};

//第三步查询是否中了视频券
function searchvid(telephone){
    getClick(telephone);
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/searchvid",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.state == false){
				b1 = 0;
				console.log("三.还没中过视频券，b1="+b1);
			}else{
				b1 = 1;
				console.log("三.我中了视频券，b1="+b1);
			}
			getClick(telephone);
		}
	});
}


//第四步进来查询点击表
function getClick(telephone){
    playGame();
	if(isSubmib){
		return;
	}
	isSubmib=true;
	$.ajax({
		url:myUrl+"/getClick",
		data:{ 'mobile': telephone },  
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			//console.log(data);
			if(data.total == null||data.total == 0||data.msg == "无数据  "){
				d1 = 0;
				console.log('四、点击没有数据或者数据为0,d1='+d1+'');
			}else{
				d1 = parseInt(data.total);
				console.log('四、用户今天有点击过,d1='+d1+'');
			}
			playGame();
		}
	});
}


//查询完数据提示窗口
function playGame(){
	console.log('-----------进入游戏准备开始-----------');
	//用户号码
	var bbb = telephone.toString();
	var ccc = bbb.substring(0,3) + '****' + bbb.substring(7,11);
	$('.myNum').html(ccc);
	$('.myPrize').html(f1);
	$("#loading").hide();
	$('.page01').addClass('cur').removeClass('hide').show();
}


//用户操作接口


//判断时间
//判断今天的日期
function getData(){
	if(isSubmib){
		return;
	}
	isSubmib=true;
    openBg();
	$.ajax({
		url:myUrl+"/getSysTime",
		type:"get",
		dataType:'jsonp',
		success:function(data){
			isSubmib=false;
			////console.log(data.time);
			var nian = data.time.substring(5,7)+data.time.substring(8,10);//格式为2017-05-31 23:09:32 展示位2位数 代表时
			var myTimer = data.time.substring(11,13);
			//console.log('日期为nian='+nian+'');
			var newH1 = parseInt(nian);
			var newTime1 = parseInt(myTimer);
			if(newH1<326){//测试开放今天
				console.log('~~~~~~~~~~活动正常时间~~~~~~~~~~');
				openBg();
			}else{
				console.log('~~~~~~~~~~活动结束~~~~~~~~~~');
			}
		}
	});

} 


