
// 4 degiskenleri global scopea al
let images, audio, font

// 5 flappy variables
let flappy = { x: 250, y: 300, vy: 0, frame: 1 }

// 7 gamemode
let gamemode = 'waiting' // 'started', 'gameover'

// 15 pipes
let pipes = [
	// { x: 900, y: 550 } // 200 ile 550 arasi
	// newPipe()
]

// 21 score
// 26 localstorage get
let score = 0
let highscore = 0
localforage.getItem('highscore', function (error, value) {
	if (value) {
		highscore = value
	}
})



// 1 setup
function setup() {
	createCanvas(1000, 600)
	frameRate(60)
	textFont(font)
}

// 2 preload
function preload() {

	images = {
		background: loadImage('images/background.png'),
		pipe: loadImage('images/pipe.png'),
		flappy1: loadImage('images/flappy1.png'),
		flappy2: loadImage('images/flappy2.png'),
		flappy3: loadImage('images/flappy3.png'),
		gameover: loadImage('images/gameover.png')
	}

	audio = {
		flap: loadSound('audio/flap.wav'),
		score: loadSound('audio/score.wav'),
		crash: loadSound('audio/crash.wav')
	}

	font = loadFont('fonts/flappy.ttf')
}

// 3 draw
function draw() {

	// 8 update flappy
	updateFlappy()

	// 17 update pipes
	updatePipes()

	// 4 draw bg
	drawBackground()

	// 6 draw flappy
	drawFlappy()

	// 16 draw pipes
	drawPipes()

	// 13 gameover?
	if (gamemode == 'gameover') {
		drawGameover()
	}

	// 22 draw score
	drawScore()

}


function drawBackground() {
	image(images.background, 0, 0, 333, 600)
	image(images.background, 333, 0, 333, 600)
	image(images.background, 666, 0, 334, 600)
}

function drawFlappy() {

	let currentImage
	if (flappy.frame == 1) {
		currentImage = images.flappy1
	}
	else if (flappy.frame == 2) {
		currentImage = images.flappy2
	}
	else {
		currentImage = images.flappy3
	}

	image(currentImage, flappy.x, flappy.y, 60, 40)
}

function updateFlappy() {

	if (gamemode == 'waiting') {
		updateFrame()
	}
	else if (gamemode == 'started') {
		updateFrame()

		// 10 gravity
		flappy.y += flappy.vy
		flappy.vy += 1

		// max speed
		if (flappy.vy > 9) flappy.vy = 9


		// 12 ground fall?
		if (flappy.y > 600) {
			gamemode = 'gameover'
		}


		// 23 score up
		let newScore = 0
		for (let i = 0; i < pipes.length; i++) {
			if (flappy.x > pipes[i].x) newScore++
		}
		if (newScore > score) {
			score = newScore

			// 32 score sound
			audio.score.play()
		}

		// 24 highscore up
		if (score > highscore) {
			highscore = score

			// 27 highscore set
			localforage.setItem('highscore', highscore, function (error) {
				// bos
			})
		}

		// 29 collision detection
		for (let i = 0; i < pipes.length; i++) {
			if (between(flappy.x, pipes[i].x - 60, pipes[i].x + 100) && !between(flappy.y, pipes[i].y - 150, pipes[i].y - 40)) {
				gamemode = 'gameover'

				// 30 crash sound
				audio.crash.play()
			}
		}


	}


}

// 9 update frame
function updateFrame() {
	if (frameCount % 5 == 0) {
		flappy.frame++

		if (flappy.frame == 4) flappy.frame = 1
	}
}

// 11 inputs
function mousePressed() {
	updateGame()
}

function keyPressed() {
	updateGame()
}

function updateGame() {

	if (gamemode == 'waiting') {
		gamemode = 'started'
	}
	else if (gamemode == 'started') {

		// 14 jump
		flappy.vy = -12

		// 31 flap sound
		audio.flap.play()
	}
	else if (gamemode == 'gameover') {
		gamemode = 'waiting'
		flappy = { x: 250, y: 300, vy: 0, frame: 1 }

		// 18 reset pipes
		pipes = []

		// 25 score reset
		score = 0
	}

}


function drawGameover() {
	image(images.gameover, 350, 200, 300, 50)
}


function drawPipes() {
	for (let i = 0; i < pipes.length; i++) {
		image(images.pipe, pipes[i].x, pipes[i].y, 100, 500)
		scale(1, -1)
		image(images.pipe, pipes[i].x, 150 - pipes[i].y, 100, 500)
		scale(1, -1)
	}
}


function updatePipes() {

	if (gamemode == 'started') {
		for (let i = 0; i < pipes.length; i++) {
			pipes[i].x -= 4
		}

		// 20 new pipes
		if (frameCount % 150 == 0) {
			pipes[pipes.length] = newPipe()
		}
	}
}

// 19 new pipe
function newPipe() {
	return {
		x: 1000,
		y: Math.random() * 350 + 200
	}
}


function drawScore() {
	textSize(70)
	text(score, 900, 70)
	textSize(20)
	text(`HI ${highscore}`, 900, 100)
}

// 28 between function
function between(value, alt, ust) {
	if (value > alt && value < ust) return true
	else return false
}