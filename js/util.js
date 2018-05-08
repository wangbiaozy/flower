/*变量*/
var audio;
document.onreadystatechange=loading;//当页面加载状态改变的时候执行这个方法
var audioEle = document.getElementById('Music');

function loading(){
	$("#loading").show();
	//document.getElementById("loading").style.display="block";
	if (document.readyState=="complete"){ //当页面加载状态为完全结束时进入 
		//document.getElementById("loading").style.display="none";
		font();
		bg();
	}
}



function bg(){
	setTimeout(function(){
		init();
		//$("#loading").hide();
		//$('.page01').addClass('cur').removeClass('hide').show();
		getData();
	},0);
}

//可视窗体对象，获取可视区域高宽
function WindowSize(width,height){
	this.width=width;
	this.height=height;
}
WindowSize.prototype.getWH=function(){
	if(window.innerWidth)
		this.width=window.innerWidth;
	else if((document.body)&&(document.body.clientWidth))
		this.width=document.body.clientWidth;
	if(window.innerHeight)
		this.height=window.innerHeight;
	else if((document.body)&&(document.body.clientHeight))
		this.height=document.body.clientHeight;
	if(document.documentElement&&document.documentElement.clientHeight&&document.documentElement.clientWidth){
		this.height=document.documentElement.clientHeight;
		this.width=document.documentElement.clientWidth;
	}
}
//调用share函数
function getUrlParam(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
