// The ball is not recentering when paddle color doesn't match ball color, why?

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
    
var x = canvas.width / 2;
var y = 0;
var dx = 2;
var dy = -1; // Speed of ball falling
    
var ballRadius = 10;
    
var paddleHeight = 6;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleHeight); 
var colorArray = [
  "#12A5F4", "#FF7900", "#00B22D"
  ];
var paddleColorIndex = 0;
var ballColorIndex = 0;
var ballColorIndex = 0;

var ballColor = colorArray[ballColorIndex];
    
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var hasGameStarted = false;

var score = 0;
var lives = 3;

// remember that we count the y values from the top left, so the top edge starts at 0 and the bottom edge is at 480 pixels, the Canvas' height 
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = colorArray[ballColorIndex];
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = colorArray[paddleColorIndex];
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = colorArray[ballColorIndex];
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = colorArray[ballColorIndex];
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
	// Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	canvas.style.border = "2px solid" + ballColor;
	
	// Don't draw until Start is pressed
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  //x += dx; // This will be a random x value to determine placement of the ball
  y -= dy;

  // If the ball collides with the top edge of the paddle, then make ball disappear
  if(y + dy > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      // If paddle color and ball color match, update score and make ball disappear
      if (colorArray[paddleColorIndex] === ballColor) {
        // Shrink paddle
        if (paddleWidth > 60) {
          paddleWidth -= 10;
        }
        // Update score
        score++;
        // Make ball disappear and re-appear at the top
        ballColor = colorArray[randomBallColorIndex()];
        x = generateRandomNumber();
        y = 0;
        //dx = 2; // This will be a random x value to determine placement of the ball
        if (dy > -6) {
          dy -= 1; // Speed of ball dropping
        }
      } else {
        lives--;
        y = 0;
        if (!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
      }
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = 0;
        //dx = 2; // This will be a random x value to determine placement of the ball
        // dy = -4; // Speed of ball dropping
      }
    }
  }
  
  // Paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  
  requestAnimationFrame(draw); // we are giving control of the framerate back to the browser
}

// Random Number Generator
function generateRandomNumber() {
  return Math.floor(Math.random() * (canvas.width - ballRadius * 2)) + ballRadius;
}
function randomBallColorIndex() {
  return ballColorIndex = Math.floor(Math.random() * colorArray.length);
}

// Keyboard controls
// Movement is handle in the draw function to create smooth movements
// Paddle Color change is handled here to give more control
function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
  } else if (e.keyCode === 40) {
    downPressed = true;
  } else if (e.keyCode === 32) { 
		// Change the color of the paddle, score and lives when spacePressed
    paddleColorIndex = (paddleColorIndex + 1) % colorArray.length;
    spacePressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40) {
    downPressed = false;
  } else if (e.keyCode === 32) {
    spacePressed = false;
  }
}
// Start game by clicking
function clickHandler(e) {
	if (e.target) {
		if (!hasGameStarted) {
			draw();
			hasGameStarted = true;
		} else if (hasGameStarted) {
			// Do nothing
		}
	}
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", clickHandler, false);

/*
// Mouse controls
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
document.addEventListener("mousemove", mouseMoveHandler, false);
*/
//draw(); // draw function is called every 10 milliseconds or until we stop it
 

//Technically, we will be painting the ball on the screen, clearing it and then painting it again in a slightly different position every frame to make the impression of movement — just like how movement works with the movies.
