var musicDur,musicPos,movableObj,currentTime,chapterCount;

var chapters = [convert('0:11.575'),convert('4:43.736'),convert('7:28.404'),
convert('12:13.828'),convert('15:07.447'),convert('26:19.903'),convert('29:29.020'),
convert('33:48.616'),convert('35:48.616'),convert('37:07.892'),convert('44:02.418'),
convert('51:47.344'),convert('58:17.951'),convert('62:57.393'),convert('70:35.049')];

function preload() {
	mySound = createAudio('http://downloads.barning.org/MDN/Talking_Table_Review_Version.mp3');
}

function setup() {
	var myCanvas = createCanvas(50, 600);
	myCanvas.parent('historyPlayer');

	movableObj = getElement('movableObj');
	movableObj.position(100,500);

	chapterCount =12;

	movableObj.mouseClicked(play_pause);
	myCanvas.mouseClicked(timeJump);
	mySound.play();
}

function draw() {
	if(!mySound.paused){
		drawPlayer();
	}
}

function drawPlayer() {
	background(255);

	fill(234,239,242);
	noStroke();
	rect(0,0,width-10,height);

	musicDur = mySound.duration();

	fill(0,149,221);
	rect(0,0,width-10,posInPlayer(mySound.time()));

	for (var i = chapters.length - 1; i >= 0; i--) {
		stroke(255);
		line(0,posInPlayer(chapters[i]),width-10,posInPlayer(chapters[i]));
	}
	noStroke();
	fill(102,153,0);
	ellipse(width-10,posInPlayer(mySound.time()),20,20);

	movableObj.position(width+15,posInPlayer(mySound.time())+20);
	movableObj.html('<p>Click me for pausing!</p><p>Total lenght is<br>'+round(musicDur)+'s</p>'
		+'<p>We played<br>'
		+round(mySound.time())+'seconds</p>');

}

function play_pause() {
	if (!mySound.paused) {
		mySound.pause();
		mySound.paused = true;
	} else {
		mySound.play();
		mySound.paused = false;
	}
}

function timeJump() {
	var setTimeTo = setPosInPlayer(mouseY); 
	mySound.time(setTimeTo);
}

function posInPlayer(thePos) {
	return (thePos/musicDur) * height;
}

function setPosInPlayer(thePos) {
	return (thePos*musicDur) / height;
}

function convert(input) {
	var parts = input.split(':'),
	minutes = +parts[0],
	seconds = +parts[1];
	return (minutes * 60 + seconds).toFixed(3);
}