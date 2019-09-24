// alert("a");
var mainDiv = document.getElementById('main');
var startImg = document.getElementById('startimg');
var pause = document.getElementById('pause');
var start = document.getElementById('start');
var num = document.getElementById('num');
var gameover = document.getElementById('gameover');
var record = document.getElementById('record');
var cha = document.getElementById('cha');
var spanList = document.getElementById('speed').getElementsByTagName('span');
var timer;
var speed = 100;

//初始化蛇的运动速度
changespeed();
function changespeed(){
	// this.speed = 100;
	for (let i = 0; i < spanList.length; i++) {
		spanList[i].onclick = function(){
			speed = parseInt(spanList[i].getAttribute('speed'));
			for (var j = 0; j < spanList.length; j++) {
				spanList[j].classList.remove('current');
			}
			spanList[i].classList.add('current');
		}
	}
}

//初始化一切条件
function init(){
	//有效区域
	this.mapWidth = parseInt(getComputedStyle(mainDiv).width);
	this.mapHeight = parseInt(getComputedStyle(mainDiv).height);
	//食物
	this.foodWidth = "20px";
	this.foodHeight = "20px";
	this.foodX = 0;
	this.foodY = 0;//X/Y 的坐标
	//蛇
	this.snakeWidth = "20px";
	this.snakeHeight = "20px";
	this.onesnake = [[3,1,"head"],[2,1,"body"],[1,1,"body"]];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	//开始游戏
	startGame();
}
//游戏开始
function startGame(){
	//显示游戏开始按钮
	pause.style.display = "block"
	//生成一条蛇
	snake();
	//生成食物
	food();
	//键盘事件启用
	bindEvent();
	//开启定时器
	timer = setInterval(move,speed);
}

function food(){
	var food = document.createElement("div");
	food.style.width = foodWidth;
	food.style.height = foodHeight;
	food.style.position = "absolute";
	// foodX =  Math.floor(Math.random() * 40);
	// foodY =  Math.floor(Math.random() * 25);

	function checkfood(){
		var foodX,foodY;
		foodX =  Math.floor(Math.random() * 40);
		foodY =  Math.floor(Math.random() * 25);
		for (var i = 0; i < this.onesnake.length; i++) {
			if(foodX == onesnake[i][0] && foodY == onesnake[i][1]){
				checkfood();
			}
			else{
				this.foodX = foodX;
				this.foodY = foodY;
			}
		}
	}
	checkfood();

	food.style.left = this.foodX * 20 + "px";
	food.style.top = this.foodY * 20 + "px";
	food.setAttribute("class","food");
	mainDiv.appendChild(food);
}
function snake(){
	for (var i = 0; i < this.onesnake.length; i++) {
		var snake = document.createElement("div");
		snake.style.width = this.snakeWidth;
		snake.style.height = this.snakeHeight;
		snake.style.position = "absolute";
		snake.style.left = onesnake[i][0] * 20 + "px";
		snake.style.top = onesnake[i][1] * 20 + "px";
		snake.classList.add(onesnake[i][2]);
		snake.classList.add("snake");
		mainDiv.appendChild(snake);
		switch(this.direct){
			case 'right':
				snake.style.transform = 'rotate(90deg)';
				break;
			case 'left':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'up':
				snake.style.transform = 'rotate(0deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(180deg)';
				break;
			default:
				break;
		}
	}
}
function move(){
	for (var i = this.onesnake.length - 1; i > 0 ; i -- ) {
		this.onesnake[i][0] = this.onesnake[i - 1][0];
		this.onesnake[i][1] = this.onesnake[i - 1][1];	
	}
	switch(this.direct){
			case 'right':
				this.onesnake[0][0] = this.onesnake[0][0] + 1;
				break;
			case 'left':
				this.onesnake[0][0] = this.onesnake[0][0] - 1;
				break;
			case 'up':
				this.onesnake[0][1] = this.onesnake[0][1] - 1;
				break;
			case 'down':
				this.onesnake[0][1] = this.onesnake[0][1] + 1;
				break;
			default:
				break;
	}
	/*var target = document.getElementsByClassName('snake');
	while(target.length > 0) {
		mainDiv.removeChild(target[0]);
	}*/
	removeClass("snake");
	snake();
	//吃到食物变化长度
	if(this.onesnake[0][0] == this.foodX && this.onesnake[0][1] == this.foodY){
		score += 10;
		num.innerHTML = score;
		record.innerHTML = score;
		removeClass('food');
		var endX = this.onesnake[this.onesnake.length - 1][0];
		var endY = this.onesnake[this.onesnake.length - 1][1];
		switch(this.direct){
			case 'right':
				this.onesnake.push([(endX - 1),endY,'body']);
				break;
			case 'left':
				this.onesnake.push([(endX + 1),endY,'body']);
				break;
			case 'up':
				this.onesnake.push([endX,(endY + 1),'body']);
				break;
			case 'down':
				this.onesnake.push([endX,(endY - 1),'body']);
				break;
			default:
				break;
		}
		food();
	}
	//蛇碰到墙壁游戏结束
	if(this.onesnake[0][0] == 40 || this.onesnake[0][0] < 0 || this.onesnake[0][1] == 25 || this.onesnake[0][1] < 0){
		clearInterval(timer);
		setTimeout(reloadGame,1000);
	}
	//蛇头碰到自身游戏结束
	for (var i = 1; i < this.onesnake.length; i++) {
		if(this.onesnake[0][0] == this.onesnake[i][0] && this.onesnake[0][1] == this.onesnake[i][1]){
			clearInterval(timer);
			setTimeout(reloadGame,1000);
		}
	}	
}

function removeClass(className){
	var target = document.getElementsByClassName(className);
	while(target.length > 0){
		target[0].parentNode.removeChild(target[0]);
	}
}

function setDirect(code){
	switch(code){
		case 37:
			if(this.left){
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if(this.up){
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if(this.right){
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if(this.down){
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		default:
			break;
	}
}
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keyCode;
		setDirect(code);
	}
}
function reloadGame(){
	removeClass('food');
	removeClass('snake');
	gameover.style.display = 'block';
	pause.style.display = "none";
	this.score = 0;
}
cha.onclick = function(){
	gameover.style.display = 'none';
	startImg.style.display = "block";
	num.innerHTML = 0;
}
startImg.onclick = function(){
	startImg.style.display = "none";
	init();
}
pause.onclick = function(){
	clearInterval(timer);
	pause.style.display = 'none';
	start.style.display = 'block';
	document.onkeydown = function(e){
		e.returnValue = false;
		return false;
	};
}
start.onclick = function(){
	timer = setInterval(move,speed);
	start.style.display = 'none';
	pause.style.display = 'block';
	bindEvent();
}