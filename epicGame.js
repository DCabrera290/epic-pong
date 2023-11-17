const canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext('2d')
const CW = canvas.width
const CH = canvas.height
const halfCW = CW / 2
const halfCH = CH / 2
let netX = CW / 2
let netY = CW / 2
let netW = 500
let netH = 5
let scoreboardOne = document.getElementById('scoreboardOne')
let scoreboardTwo = document.getElementById('scoreboardTwo')
let ballSpeedY = 5
let ballSpeedX = 5
let ballX = halfCW
let ballY = halfCH
let ballW = 30
let ballH = 30
let paddleW = 125
let paddleH = 30
let paddleOneX = halfCW - paddleW / 2
let paddleOneY = halfCH + 225
let paddleTwoX = halfCW - paddleW / 2
let paddleTwoY = halfCH - 225
let moveOneRight = false
let moveOneLeft = false
let noveTwoRight = false
let moveTwoLeft = false

function drawRect(x, y, w, h) {
  ctx.fillStyle = "white"
  ctx.fillRect(x, y, w, h)
}
function drawBall() {
  drawRect(ballX, ballY, ballW, ballH)
}
function drawPaddles() {
  drawRect(paddleOneX, paddleOneY, paddleW, paddleH)
  drawRect(paddleTwoX, paddleTwoY, paddleW, paddleH)
}
function paddleOneCollision() {
  if (ballX < paddleOneX + paddleW && ballX + ballW > paddleOneX && ballY < paddleOneY + paddleH && ballY + ballH > paddleOneY) {
    return true
  }
}
function paddleTwoCollision() {
  if (ballX < paddleTwoX + paddleW && ballX + ballW > paddleTwoX && ballY < paddleTwoY + paddleH && ballY + ballH > paddleTwoY) {
    return true
}
}
drawRect(paddleOneX, paddleOneY, paddleW, paddleH)
drawRect(paddleTwoX, paddleTwoY, paddleW, paddleH)
drawRect(ballX - 15, ballY + 13, ballW, ballH)
drawNet()

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    moveOneRight = true
  }
  if (event.key === 'ArrowLeft') {
    moveOneLeft = true
  }
  if (event.key === '') {
    moveTwoLeft = true
  }
  if (event.key === 'keyD') {
    moveTwoRight = true
  }
})
document.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowRight') {
    moveOneRight = false
  }
  if (event.key === 'ArrowLeft') {
    moveOneLeft = false
  }
  if (event.key === 'keyA') {
    moveTwoLeft = false
  }
  if(event.key === 'keyD') {
    moveTwoRight = false
  }
})
function drawNet() {
  drawRect(netX - 250, netY * 1.5, netW, netH)
}
function playGame() {
  ballX += ballSpeedX
  ballY += ballSpeedY
  ctx.clearRect(0, 0, CW, CH)
  if(ballX + ballW > CW || ballX < 0) {
    ballSpeedX *= -1
  }
  if (ballY + ballW > CH || ballY < 0) {
    ballSpeedY *= -1
  }
  if (paddleOneCollision()) {
    ballSpeedY *= -1
  }
  if (paddleTwoCollision()) {
    ballSpeedY *= -1
  }
  if (moveOneRight && paddleOneX + paddleW < CW) {
    paddleOneX += 15
  }
  if (moveOneLeft && paddleOneX > 0) {
    paddleOneX -= 15
  }
   if(paddleOneX < 0 || paddleOneX + paddleW > CW) {
    paddleSpeedX = 0
  }
  
  drawBall()
  drawPaddles()
  drawRect(ballX, ballY, ballW, ballH)
  drawNet()
  requestAnimationFrame(playGame)
}