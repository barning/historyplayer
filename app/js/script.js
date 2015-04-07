var musicDur,musicPos;

function preload() {
 mySound = loadSound('./audio/music.mp3');
}

function setup() {
	musicDur = round(mySound.duration());
  	createCanvas(200, 600);
  	mySound.play();
}

function draw() {
	background(200);
	text("Total lenght: "+musicDur,10,300);
	text("Current time: "+mySound.currentTime(),10,400);
	var musicPos = mySound.currentTime();
	var playerHeight = (musicPos/musicDur) * height;
	fill(255);
	noStroke();
	rect(0,0,200,playerHeight);
}

function mousePressed() {
  if ( mySound.isPlaying() ) { // .isPlaying() returns a boolean
    mySound.pause();
    background(255,0,0);
  } else {
    mySound.play();
    background(0,255,0);
  }
}