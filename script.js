var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext("2d");

var posx,posy;
var ptop;
var dr;
var left,right,up,down;
var x_rand,y_rand;
var temp_x,temp_y;
var isps;
var score;

function init(){
	posx=[];
	posy=[];
	posx.push(5);
	posx.push(6);
	posx.push(7);
	posx.push(8);
	posx.push(9);
	posx.push(10);
	posy.push(10);
	posy.push(10);
	posy.push(10);
	posy.push(10);
	posy.push(10);
	posy.push(10);
	temp_x = 5;
	temp_y = 10;
	ptop=5;
	dr=1;
	random_block();
	left=false;
	right=false;
	up=false;
	down=false;
	isps = true;
	lost = false;
	score = 0;
}
init();

function random_block(){
	x_rand = getRandomInt(0,59);
	y_rand = getRandomInt(0,29);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move(dir){
	<!--FOLLOW UP-->
	temp_x = posx[0];
	temp_y = posy[0];
	for (var i=0;i<ptop;i+=1){
		posx[i] = posx[i+1];
		posy[i] = posy[i+1];
	}
	if (dir==1) posx[ptop]+=1;
	else if (dir==2) posy[ptop]+=1;
	else if (dir==3) posx[ptop]-=1;
	else posy[ptop]-=1;
	if (posx[ptop]==-1||posy[ptop]==-1||posx[ptop]==60||posy[ptop]==30) lost = true;
	for (var i=0;i<ptop;i+=1) if (posx[ptop]==posx[i] && posy[ptop]==posy[i]) lost = true;
}

function eat(){
	ptop+=1;
	for (var i=ptop+1;i>0;i-=1){
		posx[i] = posx[i-1];
		posy[i] = posy[i-1];
	}
	posx[0] = temp_x;
	posy[0] = temp_y;
	random_block();
	score+=1;
}

function draw(){
	document.getElementById('scre').innerHTML="SCORE:"+score;
	if (lost==true) isps = true;
	if (isps==false){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		move(dr);
		ctx.beginPath();
		ctx.rect(x_rand*20,y_rand*20,20,20);
		ctx.fillStyle = '#FE2E2E';
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		for (var i=0;i<=ptop;i+=1){
			ctx.rect(posx[i]*20,posy[i]*20,19,19);
			ctx.fillStyle = '#610B0B';
			ctx.fill();
		}
		if (posx[ptop]==x_rand && posy[ptop]==y_rand) eat();
		ctx.closePath();
	}
}

function keyDownHandler(key){
	if (key.keyCode==32){
		if (isps==true) isps=false;
		else isps = true;
	}
	if (isps==false){
		if (key.keyCode==38 && dr!=2) dr=4;
		else if (key.keyCode==40 && dr!=4) dr=2;
		else if (key.keyCode==37 && dr!=1) dr=3;
		else if (key.keyCode==39 && dr!=3) dr=1;
	}
	if (key.keyCode==13){
		init();
		isps=false;
	}
	draw();
}

document.addEventListener("keydown",keyDownHandler,false);
setInterval(draw,65);
