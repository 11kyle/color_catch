var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
    
var x = canvas.width / 2;
var y = 0;
var dx = 2;
var dy = -1; // Speed of ball falling
    
var ballRadius = 10;
    
var paddleHeight = 4;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = (canvas.height - paddleHeight); 
var colorArray = [
  "#0095DD", "#8a00e0", "#e00000"
  ];
var paddleColorIndex = 0;
var ballColorIndex = 0;
var ballColor = colorArray[ballColorIndex];
    
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var score = 0;
var lives = 3;

// remember that we count the y values from the top left, so the top edge starts at 0 and the bottom edge is at 480 pixels, the Canvas' height 
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
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
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas
  drawBall();
  drawPaddle();
  //collisionDetection();
  drawScore();
  drawLives();
  //x += dx; // This will be a random x value to determine placement of the ball
  y -= dy;

  // If the ball collides with the top edge of the paddle, then make ball disappear
  if(y + dy > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      // If paddle color and ball color match, update score and make ball disappear
      if (colorArray[paddleColorIndex] === "#0095DD") {
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
        dy -= 1; // Speed of ball dropping
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
  
  //
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  } 
  /*
  else if (upPressed && paddleY > 0) {
    paddleY -= 4;
  } else if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 4;
  }
  */
  else if (spacePressed) {
    console.log("Space Pressed");
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
    paddleColorIndex = (paddleColorIndex + 1) % (colorArray.length);
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
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function collisionDetection() {
  
}

    
draw(); // draw function is called every 10 milliseconds or until we stop it

//Technically, we will be painting the ball on the screen, clearing it and then painting it again in a slightly different position every frame to make the impression of movement — just like how movement works with the movies.
