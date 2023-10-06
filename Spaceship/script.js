// const hitSound = document.getElementById("hitSound");
// const groundSound = document.getElementById("groundSound");
const player = document.getElementById("player");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const highestScoreElement = document.getElementById("highestScore");
const playerWidth = 10;
const playerHeight = 10;
const boxWidth = 20; // Width of the falling red dots
const boxHeight = 20; // Height of the falling red dots
const boxSpeed = 2; // Speed of the falling red dots
const spawnInterval = 2000; // Interval at which red dots are spawned
const maxRedDots = 5; // Maximum number of red dots on the screen at a time
const bulletSpeed = 5;
const maxBullets = 5;
const resultDiv = document.getElementById("result");
const resultDisplay = document.getElementById("resultText");

let playerX = canvas.width / 2 - 5; // Initial player position
const playerY = canvas.height - 20; // Fixed player Y position

let redDots = []; // Array to store red dots
let bullets = []; // Array to store bullets
let score = 0;
let highestScore = 0;
let gameTimer;
let redDotInterval;
let maxScoreLogged = false;

function startGame() {
  score = 0;
  scoreElement.textContent = score;
  timerElement.textContent = "60";
  if (!resultDiv.classList.contains("none")) {
    resultDiv.classList.add("none");
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
      }
      resultDisplay.innerHTML = `Game Over!!! Congratulations you have obtained a maxScore of:${highestScore}`;
      clearInterval(gameTimer);
      timerElement.textContent = "Time's up!";
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
  clearInterval(redDotInterval); // Clear the red dot spawning interval
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
    // Move the player to the left, but ensure it stays within the canvas
    playerX = Math.max(0, playerX - 5);
  } else if (event.key === "ArrowRight") {
    // Move the player to the right, but ensure it stays within the canvas
    playerX = Math.min(canvas.width - playerWidth, playerX + 5);
  }
});

// Main game loop
function gameLoop() {
  drawPlayer();
  updateBullets();
  updateRedDots();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
// </script>
