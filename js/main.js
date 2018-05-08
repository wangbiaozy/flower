//可视窗体对象，获取可视区域高宽，返回windowSize.width,windowSize.height
var windowSize=new WindowSize();
windowSize.getWH();


//初始化,调整尺寸
function init(){
	$("#container,.page").width(windowSize.width);
	$("#container,.page").height(windowSize.height);
	$(".con").width((windowSize.width)*0.383);
	$(".con").height((windowSize.height)*0.27);
	page=$(".page");
	for(var i=0;i<page.length;i++){
		page[i]=$(page[i]);
	}
	var mySize = windowSize.width/windowSize.height;
	if(mySize>0.65){
		//屏幕大于0.65修改样式
		console.log('变样式'+mySize);
	}else{
		//console.log('不变'+mySize);
	}
}

$(function(){
	
	//点击窗口给样式
	$('.con').click(function(e) {
        $(this).children('.conIn').addClass('conIn_cur');
		$(this).siblings().children('.conIn').removeClass('conIn_cur')
    });
	
	//点击关闭窗口
	$('.close').click(function(e) {
        $('.tc,.tcIn').hide();
    });
	
	//点击活动规则
	$('.i13').click(function(e) {
        $('.tc,.tc_02').show();
    });

});



