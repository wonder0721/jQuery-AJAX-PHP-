// alert('a');
//1.点击开始按钮，开始按钮变成刷新按钮，游戏开始，计时器启动；
//2.生成10*10的棋盘，随机放置10个炸弹
//3.左键点击小格事件 拓展事件
//4.取消右键默认点击事件 ，右键点击小格，插旗子，且左键不能点击

var box = document.getElementById('box');
var startBtn = document.getElementById('start');
var oImage = document.getElementsByClassName('game-active')[0];
var timeRecord = document.getElementById('time');
var rule = document.getElementsByClassName('rule')[0];
var sizeX = 30;
var sizeY = 20;
var n = 0;
//定义雷的数量
boomNum = 100;	
var ruletimer = null;

init();
function init(){
	//取消界面右键点击默认事件
	document.oncontextmenu = function(){
		return false;
	}
	startBtn.onclick = function(){
		n = 0;
		var point = document.getElementsByClassName('point');
		if(point.length){
			for (var i = 0; i < 600; i++) {
				//每次执行一次for循环，即删除一个子元素后，下一个子元素就在当前【0】的位置
				//如果将0换成i则会造成隔一个删除一个。
				box.removeChild(point[0]);
			}
		}
		//开始游戏
		startGame();	
	}
}

function startGame(){
	//生成棋盘
	makeMap();
	//添加点击右键加旗子事件
	addqi();
	//添加炸弹
	addBoom();
	//添加绑定事件
	bindEvent();
	//图片换回初始状态
	oImage.style.backgroundImage = "url('./images/lei/震动.gif')";
	//计时器归零
	timeRecord.innerHTML = '00:00:00';
}

function makeMap(){
	for (var i = 0; i < sizeY; i++) {
		for (var j = 0; j < sizeX; j++) {
			this.point = document.createElement('div');
			this.point.classList.add('point');
			this.point.setAttribute('id',i + '-' + j);		
			box.appendChild(point);
		}
	}
	this.odiv = document.getElementsByClassName('point');
}

function bindEvent(){
	//为每个小格绑定事件
	for (var i = 0; i < odiv.length; i++) {
		odiv[i].onclick = function (){
			//点到数字的情况
			if(!this.classList.contains('qizi') && !this.classList.contains('boom') && !this.classList.contains('number')){
				this.classList.add('number');
				caculateNum(this);
				n = document.getElementsByClassName('number').length;
				if(n == (sizeX * sizeY) - boomNum){
					oImage.style.backgroundImage = "url('./images/lei/papa.gif')";
					// clearInterval(creatTimer_timer);
					for (var i = 0; i < odiv.length; i++){
						odiv[i].onclick = function(){return false;}
						box.oncontextmenu = function(){return false;}
					}
				}
			}
			//点到雷的情况
			else if(!this.classList.contains('qizi') && this.classList.contains('boom')){
				var boomList = box.getElementsByClassName('boom');
				for (var i = 0; i < boomList.length; i++) {
					boomList[i].classList.add('boomover');
				}
				this.style.backgroundColor = 'red';
				//取消所有点击事件
				for (var i = 0; i < odiv.length; i++){
					odiv[i].onclick = function(){return false;}
					box.oncontextmenu = function(){return false;}
				}
				oImage.style.backgroundImage = "url('./images/lei/lose.jpg')";
				// clearInterval(creatTimer_timer);
			}
			else{
				return false;
			}
		}
	}		
}

function addqi(){
	box.oncontextmenu = function(e){
		var event = e || window.event;
		var target = event.srcElement || event.target;
		if(!target.classList.contains('qizi') && !target.classList.contains('number')){
			target.classList.add('qizi');
			return false;
		}
		else{
			target.classList.remove('qizi');
			return false;
		}
	}
}

function addBoom(){
	//随机加入20个炸弹 通过添加类名‘boom’
	// console.log(Math.floor(Math.random()*100));
	var a = 0;
	while(a < boomNum){
		var targetP = (Math.floor(Math.random() * (sizeX * sizeY)));
		if(odiv[targetP].classList.contains('boom')){
			a --;
		}
		odiv[targetP].classList.add('boom');
		a ++;
	}
	// console.log(document.getElementsByClassName('boom').length);
}

function caculateNum(point){
	var aroundNum = 0;
	var pointArr = point.getAttribute('id').split('-');
	var pointX = parseInt(pointArr[0]);
	var pointY = parseInt(pointArr[1]);
	var arr = [];
	for (var i = pointX - 1; i <= pointX + 1; i++) {
		for (var j = pointY - 1; j <= pointY + 1; j++) {
			var around = document.getElementById(i + '-' + j);
			if(around){
				arr.push(around);
			}
		}
	}
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].classList.contains('boom')){
			aroundNum ++;
		}
	}
	point.innerHTML = aroundNum;
	switch(aroundNum){
			case 0: 
			point.innerHTML = '';
			point.classList.add('checked');
			for (var i = pointX - 1; i <= pointX + 1; i++) {
				for (var j = pointY - 1; j <= pointY + 1; j++){
					var nearbox = document.getElementById(i + '-' + j);
					if(nearbox && !nearbox.classList.contains('checked')){
						nearbox.classList.add('checked');
						nearbox.classList.add('number');
						nearbox.classList.remove('qizi');
						caculateNum(nearbox);
					}
				}
			}
			break;
			case 1:
			break;
			case 2:
			point.style.color = 'green';
			break;
			case 3:
			point.style.color = 'red';
			break;
			case 4:
			point.style.color = '#f0f';
			break;
			case 5:
			point.style.color = '#ff0';
			break;
			case 6:
			point.style.color = '#0ff';
			break;
			case 7:
			point.style.color = '#000';
			break;
			case 8:
			point.style.color = '#fff';
			break;
	}
}