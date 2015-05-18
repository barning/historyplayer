var musicDur,musicPos,movableObj,currentTime,chapterCount;

var chapters = [convert('0:11.575'),convert('4:43.736'),convert('7:28.404'),
convert('12:13.828'),convert('15:07.447'),convert('26:19.903'),convert('29:29.020'),
convert('33:48.616'),convert('35:48.616'),convert('37:07.892'),convert('44:02.418'),
convert('51:47.344'),convert('58:17.951'),convert('62:57.393'),convert('70:35.049')];

function preload() {
	//mySound = createAudio('http://downloads.barning.org/MDN/Talking_Table_Review_Version.mp3');
	mySound = createAudio('http://upload.wikimedia.org/wikipedia/en/0/04/Rayman_2_music_sample.ogg');
}

function setup() {
	var chapterHeight = $('#chapter').height();
	var myCanvas = createCanvas(55, chapterHeight);
	myCanvas.parent('verticalPlayer');

	movableObj = getElement('movableObj');
	//movableObj.position(100,500);

	chapterCount =chapters.lenght;

	movableObj.mouseClicked(play_pause);
	myCanvas.mouseClicked(timeJump);
	//mySound.play();
}

function draw() {


		clear();
		playerElement();
		//drawChapters();
		if(!mySound.paused){
		movableObj.html('<p>Click me for pausing!</p><p>Total lenght is<br>'+round(musicDur)+'s</p>'
			+'<p>We played<br>'
			+round(mySound.time())+'seconds</p>');

			$('.infobox > article').each(function(i) {
				setTimeout(function(){
						$(this).addClass('animated fadeIn');
					}.bind(this), i * 5000)
					});
	}
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

function playerElement(){
	noStroke();
	fill('#f4f7f8');
	rect(49/2,0,width-49,height);

	musicDur = mySound.duration();

	fill(0,149,221);
	ellipseMode(CENTER);
	ellipse(width/2,posInPlayer(mySound.time())-1,5,5)
	rect(49/2,0,width-49,posInPlayer(mySound.time()));
}

function drawChapters(){
	for (var i = chapters.length - 1; i >= 0; i--) {
		stroke(244,247,248);
		strokeWeight(4);
		fill('#0095DD');
		ellipseMode(CENTER);
		ellipse(width/2,posInPlayer(chapters[i]),15,15)
	}
}
