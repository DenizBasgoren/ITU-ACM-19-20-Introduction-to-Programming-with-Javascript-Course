
// 3 top
// let ball = { x: 500, y: 300, vx: 0, vy: 1 }

// 17 constructor duzeltmesi
let ball = newBall()




// 9 skor
let score = { bottom: 0, top: 0 }

// 13 raketler
let paddles = {
	bottom: { x: 500, y: 570 },
	top: { x: 500, y: 30 }
}

// 22 game mode
let gamemode = 'mouse' // 'keyboard'





// 1 setup
function setup() {
	createCanvas(1000, 600)
	frameRate(60)
	ellipseMode(CENTER)
	rectMode(CENTER, CENTER)


	// 12 skor buyuklugunu ayarla
	fill('white')
	textSize(40)

	// 23 gamemode switch
	let button1 = createButton('MOUSE MODE')
	button1.position(850, 50)
	button1.mousePressed(switchToMouseMode)

	let button2 = createButton('KEYBOARD MODE')
	button2.position(850, 80)
	button2.mousePressed(switchToKeyboardMode)
}

// 2 draw
function draw() {
	background('black')

	// 5 topu guncelle
	updateBall()

	// 20 kontroller
	updatePaddles()


	// 4 topu ciz
	drawBall()

	// 11 skoru ciz
	drawScore()

	// 14 raketleri ciz
	drawPaddles()
}

function drawBall() {
	circle(ball.x, ball.y, 20)
}

function updateBall() {
	ball.x += ball.vx
	ball.y += ball.vy

	// 6 wall collision
	if (ball.x > width) {
		ball.vx *= -1
	}
	if (ball.x < 0) {
		ball.vx *= -1
	}

	// 7 top hizlanir
	ball.vx *= 1.001
	ball.vy *= 1.001

	// 8 gol ise geri getir
	// 10 skoru guncelle
	// 18 constructor duzeltmeleri
	if (ball.y > height) {

		// ball = { x: 500, y: 300, vx: 0, vy: 1 }
		ball = newBall()
		score.top++
	}
	else if (ball.y < 0) {

		// ball = { x: 500, y: 300, vx: 0, vy: 1 }
		ball = newBall()
		score.bottom++
	}

	// 15 collision detection

	// bottom
	if (Math.abs(ball.x - paddles.bottom.x) < 125
		&& Math.abs(ball.y - paddles.bottom.y) < 10
	) {
		ball.vy *= -1
	}
	// top
	else if (Math.abs(ball.x - paddles.top.x) < 125
		&& Math.abs(ball.y - paddles.top.y) < 10
	) {
		ball.vy *= -1
	}

}

function drawScore() {
	text(score.top, 20, 50)
	text(score.bottom, 20, 100)
}

function drawPaddles() {
	// bottom
	rect(paddles.bottom.x, paddles.bottom.y, 250, 20)

	// top
	rect(paddles.top.x, paddles.top.y, 250, 20)
}


// 16 constructor
// 19 random ball duzeltmesi
function newBall() {
	// return { x: 500, y: 300, vx: 0, vy: 1 }
	return {
		x: 500,
		y: 300,
		vx: Math.random() * 6 - 3,
		vy: Math.random() * 6 - 3
	}
}

// 25 if gamemode ..
function updatePaddles() {

	if (gamemode == 'mouse') {
		if (mouseX - paddles.bottom.x > 50) {
			paddles.bottom.x += 5
		}
		else if (mouseX - paddles.bottom.x < -50) {
			paddles.bottom.x -= 5
		}

	}
	else if (gamemode == 'keyboard') {

		// 21 klavye
		if (keyIsPressed) {
			if (key == 'a' || key == 'A' || key == 'ArrowLeft') {
				paddles.bottom.x -= 5
			}
			else if (key == 'd' || key == 'D' || key == 'ArrowRight') {
				paddles.bottom.x += 5
			}
		}

	}

	// 26 cpu
	if (ball.x > paddles.top.x) {
		paddles.top.x += 5
	}
	else {
		paddles.top.x -= 5
	}
}

// 24 handlers
function switchToMouseMode() {
	gamemode = 'mouse'
}

function switchToKeyboardMode() {
	gamemode = 'keyboard'
}


// homework:
// 1. Top hep aynı hızda başlasın. (örn 3 hızında)
// 2. Paddlelar ekran sınırlarını aşamasın.
// 3. Daha sağlam bir cpu yaz.