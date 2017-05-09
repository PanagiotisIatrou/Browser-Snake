var scl = 30;
var sizeX = 1920,
	sizeY = 974;
var cols = sizeX / scl,
	rows = sizeY / scl;
var posX = [],
	posY = [];
var lastPosX = [],
	lastPosY = [];
var bodyCounter = 1;
var foodX, foodY;
var score = 0;
var dir = [0],
	lastDir = 0; // null 0, up 1, down 2, left 3, right 4
var counter = 0;

function setup() {
	createCanvas(sizeX, sizeY);
	frameRate(100);
	textSize(30);
	setFoodPos();
	posX[0] = floor(random(cols)) * scl;
	posY[0] = floor(random(rows)) * scl;
}

function draw() {
	background(51);
	movement();
	takeAction();
	checkCollisions();
	fill(0, 255, 0);
	text(score, 10, 30);
	drawStuff();
}

function drawStuff() {
	fill(255, 255, 255);
	for (var i = 0; i < bodyCounter; i++) {
		rect(posX[i], posY[i], scl, scl);
	}
	fill(245, 72, 72);
	rect(foodX, foodY, scl, scl);
}

function setFoodPos() {
	foodX = floor(random(cols)) * scl;
	foodY = floor(random(rows)) * scl;
}

function checkCollisions() {
	for (var i = 0; i < bodyCounter; i++) {
		if (posX[i] == foodX && posY[i] == foodY) {
			setFoodPos();
			score++;
			bodyCounter++;
			if (dir[bodyCounter - 1] == 1) {
				posX[bodyCounter - 1] = posX[bodyCounter - 2];
				posY[bodyCounter - 1] = posY[bodyCounter - 2] + scl;
			} else if (dir[bodyCounter - 1] == 2) {
				posX[bodyCounter - 1] = posX[bodyCounter - 2];
				posY[bodyCounter - 1] = posY[bodyCounter - 2] - scl;
			} else if (dir[bodyCounter - 1] == 3) {
				posX[bodyCounter - 1] = posX[bodyCounter - 2] + scl;
				posY[bodyCounter - 1] = posY[bodyCounter - 2];
			} else if (dir[bodyCounter - 1] == 4) {
				posX[bodyCounter - 1] = posX[bodyCounter - 2] - scl;
				posY[bodyCounter - 1] = posY[bodyCounter - 2];
			}
		}
		if (posX[0] < 0 || posX[0] > sizeX || posY[0] < 0 || posY[0] > sizeY) {
			// reset data
			score = 0;
			bodyCounter = 1;
			setFoodPos();
			dir[0] = 0;
			// delete every unneeded data
			for (var i; i < posX.length - 1; i++) {
				delete posX[i];
				delete posY[i];
				delete lastPosX[i];
				delete lastPosY[i];
			}
			posX[0] = floor(random(cols)) * scl;
			posY[0] = floor(random(rows)) * scl;
		}
		for (var j = 0; j < bodyCounter; j++) {
			if (i === j) continue;
			if (posX[i] == posX[j] && posY[i] == posY[j]) {
				// reset data
				score = 0;
				bodyCounter = 1;
				setFoodPos();
				dir[0] = 0;
				// delete every unneeded data
				for (var i; i < posX.length - 1; i++) {
					delete posX[i];
					delete posY[i];
					delete lastPosX[i];
					delete lastPosY[i];
				}
				posX[0] = floor(random(cols)) * scl;
				posY[0] = floor(random(rows)) * scl;
			}
		}
	}
}

function movement() {
	if (keyIsDown(UP_ARROW) && dir[0] != 2) {
		dir[0] = 1;
	}
	if (keyIsDown(DOWN_ARROW) && dir[0] != 1) {
		dir[0] = 2;
	}
	if (keyIsDown(LEFT_ARROW) && dir[0] != 4) {
		dir[0] = 3;
	}
	if (keyIsDown(RIGHT_ARROW) && dir[0] != 3) {
		dir[0] = 4;
	}


	// space to add more body parts

}

function keyPressed() {
	if (keyCode == 32) {
		score++;
		bodyCounter++;
		if (dir[bodyCounter - 1] == 1) {
			posX[bodyCounter - 1] = posX[bodyCounter - 2];
			posY[bodyCounter - 1] = posY[bodyCounter - 2] + scl;
		} else if (dir[bodyCounter - 1] == 2) {
			posX[bodyCounter - 1] = posX[bodyCounter - 2];
			posY[bodyCounter - 1] = posY[bodyCounter - 2] - scl;
		} else if (dir[bodyCounter - 1] == 3) {
			posX[bodyCounter - 1] = posX[bodyCounter - 2] + scl;
			posY[bodyCounter - 1] = posY[bodyCounter - 2];
		} else if (dir[bodyCounter - 1] == 4) {
			posX[bodyCounter - 1] = posX[bodyCounter - 2] - scl;
			posY[bodyCounter - 1] = posY[bodyCounter - 2];
		}
	}
}

function takeAction() {
	counter++;
	if (counter == 5) {
		counter = 0;

		for (var i = 0; i < bodyCounter; i++) {
			if (i == 0) {
				lastPosX[0] = posX[0];
				lastPosY[0] = posY[0];
				lastDir[0] = dir[0]
				continue;
			}
			lastPosX[i] = posX[i];
			lastPosY[i] = posY[i];
			lastDir[i] = dir[i];
		}

		if (dir[0] == 0)
			return;
		if (dir[0] == 1) {
			posY[0] -= scl;
		}
		if (dir[0] == 2) {
			posY[0] += scl;
		}
		if (dir[0] == 3) {
			posX[0] -= scl;
		}
		if (dir[0] == 4) {
			posX[0] += scl;
		}

		for (var i = 0; i < bodyCounter; i++) {
			if (i === 0) continue;
			posX[i] = lastPosX[i - 1];
			posY[i] = lastPosY[i - 1];
			dir[i] = lastDir[i - 1];
		}

	}
}