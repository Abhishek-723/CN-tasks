const hitSound = document.getElementById("hitSound");
const groundSound = document.getElementById("groundSound");
const player = document.getElementById("player");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const highestScoreElement = document.getElementById("highestScore");
const playerWidth = 10;
const playerHeight = 10;
const boxWidth = 20;
const boxHeight = 20;
const boxSpeed = 2;
const spawnInterval = 2000;
const maxRedDots = 5;
const bulletSpeed = 5;
const maxBullets = 5;
const resultDiv = document.getElementById("gameOverScreen");
const resultDisplay = document.getElementById("gameOverText");
const finalScore = document.getElementById("finalHighestScore");

let playerX = canvas.width / 2 - 5;
const playerY = canvas.height - 20;

let redDots = []; // Array to store red dots
let bullets = []; // Array to store bullets
let score = 0;
let highestScore = 0;
let gameTimer;
let redDotInterval;
let maxScoreLogged = false;
let startG = false;

function startGame() {
  if (startG === true) {
    window.location.reload();
    return;
  }
  if (startG === false) {
    startG = true;
    startButton.innerHTML = "Cancel Game";
  }
  score = 0;
  scoreElement.textContent = score;
  timerElement.textContent = "60";
  if (!resultDiv.classList.contains("none")) {
    resultDiv.classList.add("none");
    resultDiv.classList.remove("resultText");
  }

  clearInterval(gameTimer); // Clear any existing game timer
  clearInterval(redDotInterval); // Clear the red dot spawning interval

  let seconds = 60;
  console.log("started");
  gameTimer = setInterval(function () {
    timerElement.textContent = seconds;
    seconds--;
    // Check if the countdown is finished
    if (seconds < 0) {
      if (resultDiv.classList.contains("none")) {
        resultDiv.classList.remove("none");
        resultDiv.classList.add("resultText");
      }
      resultDisplay.innerHTML = `Game Over!!!`;
      finalScore.textContent = highestScore;
      clearInterval(gameTimer);
      timerElement.textContent = "Time's up!";
      startG = false;
      startButton.innerHTML = "Start Game";
      stopGame(); // Stop the game when the timer reaches 0
    }
  }, 1000);

  // Start spawning red dots
  redDotInterval = setInterval(createRedDot, spawnInterval);
}

// Function to draw the player on the canvas
function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, playerY, 10, 10);
}

// Function to update the bullets
function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= bulletSpeed;
    ctx.fillStyle = "white";
    ctx.fillRect(bullets[i].x, bullets[i].y, 2, 10);

    // Remove bullets that are out of the canvas
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
  }
}

// Function to create red dots
function createRedDot() {
  if (redDots.length < maxRedDots) {
    const x = Math.random() * (canvas.width - boxWidth);
    const y = 0;
    redDots.push({ x, y });
  }
}

// Function to update red dots and handle collisions
function updateRedDots() {
  for (let i = 0; i < redDots.length; i++) {
    redDots[i].y += boxSpeed;
    ctx.fillStyle = "red";
    ctx.fillRect(redDots[i].x, redDots[i].y, boxWidth, boxHeight);

    // Check for collision with bullets
    for (let j = 0; j < bullets.length; j++) {
      if (
        bullets[j].x >= redDots[i].x &&
        bullets[j].x <= redDots[i].x + boxWidth &&
        bullets[j].y >= redDots[i].y &&
        bullets[j].y <= redDots[i].y + boxHeight
      ) {
        // Bullet hit the red dot
        hitSound.currentTime = 0; // Reset the audio to the beginning
        hitSound.play();
        redDots.splice(i, 1);
        i--;

        // Remove the bullet
        bullets.splice(j, 1);
        j--;

        // Update the score
        score += 10;
        scoreElement.textContent = score;

        // Update the highest score if needed
        if (score > highestScore) {
          highestScore = score;
          highestScoreElement.textContent = highestScore;
        }
      }
    }

    // Remove red dots that are out of the canvas
    if (redDots[i] && redDots[i].y > canvas.height) {
      redDots.splice(i, 1);
      i--;
    }

    // Check if a red dot is missed
    if (redDots[i] && redDots[i].y + boxHeight >= playerY) {
      // Remove the red dot
      redDots.splice(i, 1);
      i--;

      // Decrement the score by 5 with a minimum value of 0
      groundSound.currentTime = 0; // Reset the audio to the beginning
      groundSound.play();
      score = Math.max(0, score - 5);
      scoreElement.textContent = score;
    }
  }
}

// Function to handle spacebar click
function shoot() {
  if (bullets.length < maxBullets) {
    const bulletX = playerX + 4;
    const bulletY = playerY;
    bullets.push({ x: bulletX, y: bulletY });
  }
}

// Function to stop the game
function stopGame() {
  clearInterval(gameTimer);
  clearInterval(redDotInterval);
  if (!maxScoreLogged) {
    maxScoreLogged = true;
    console.log("Max Score: " + highestScore);
  }
}

// Event listener for spacebar click
window.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "Spacebar") {
    shoot();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    playerX = Math.max(0, playerX - 5);
  } else if (event.key === "ArrowRight") {
    playerX = Math.min(canvas.width - playerWidth, playerX + 5);
  }
});

function gameLoop() {
  drawPlayer();
  updateBullets();
  updateRedDots();
  requestAnimationFrame(gameLoop);
}

gameLoop();
