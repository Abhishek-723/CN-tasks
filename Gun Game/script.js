// Fetch the canvas element from the HTML
const canvas = document.getElementById("gameCanvas");
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startGameBtn");
const currScore = document.getElementById("currentScore");
const maxScore = document.getElementById("highestScore");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let gameStarted = false;

// Define the gun object and its properties
let gun = {
  x: canvas.width / 2 - 25, // Horizontal position (center of canvas, offset by half of the gun's width)
  y: canvas.height - 100, // Vertical position (bottom of the canvas)
  width: 50, // Width of the gun
  height: 80, // Height of the gun
  dx: 20, // Change in x-direction for movement
};

// An array to store the bullets
let bullets = [];
let bulletWidth = 4;
let bulletHeight = 4;

// Define the target object and its properties
let target = {
  x: 100, // Initial horizontal position
  y: 50, // Vertical position
  radius: 20, // Radius of the target
  dx: 6, // Change in x-direction for movement
};

// Load the bullet sound effect
let bulletSound = new Audio(
  "https://actions.google.com/sounds/v1/weapons/big_explosion_cut_off.ogg"
);
let gameOverSound = new Audio(
  "https://actions.google.com/sounds/v1/impacts/crash.ogg"
);
// Game variables
let score = 0; // Player's current score
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let spacePressed = false; // Track if the spacebar is pressed
let gameState = "notStarted"; // Current game state (notStarted, ongoing, ended)
let consecutiveMisses = 0; // Track consecutive missed shots

let monsterSpeed = 5;
let monsterImg = new Image();
monsterImg.src = "monster.jpg"; // path to your monster image
monsterImg.width = 50;
monsterImg.height = 50;
let monsterX = canvasWidth / 2 - monsterImg.width / 2; // Initial X position of the monster
let monsterY = 0; // Initial Y position of the monster
let monsterDirection = 0; // 1 for moving right, -1 for moving left

let bulletImg = new Image();
bulletImg.src = "bullet.png"; // path to your bullet image

let image = new Image();
image.src = "gunImage.webp";
image.width = gun.width;
image.height = gun.height; // path to your gun image
let gunX = 0;

function drawGun() {
  var wrh = image.width / image.height;
  var newWidth = image.width;
  var newHeight = image.height;
  var x = canvasHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, gunX, x - newHeight, newWidth, newHeight);
}

function drawBullets() {
  for (let bullet of bullets) {
    ctx.drawImage(bulletImg, bullet.x, bullet.y, bulletWidth, bulletHeight);
  }
}
function drawMonster() {
  ctx.drawImage(
    monsterImg,
    monsterX,
    monsterY,
    monsterImg.width,
    monsterImg.height
  );
}

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "ArrowLeft" && gunX - 10 >= 0) {
    gunX -= 10;
    drawGun();
  } else if (
    event.key === "ArrowRight" &&
    gunX + image.width + 10 <= canvasWidth
  ) {
    gunX += 10;
    drawGun();
  } else if (event.key === " ") {
    // Space key
    // Calculate the initial position of the bullet
    const bulletX = gunX;
    const bulletY = canvas.height - image.height;

    bullets.push({ x: bulletX, y: bulletY });
    drawBullets();
    bulletSound.play();
  } else if (event.key === "Enter" && !gameStarted) {
    monsterDirection = 1;
    canvas.style.backgroundColor = "black";
    monsterX = canvasWidth / 2 - monsterImg.width / 2;
    gameStarted = true;
    update();
  }
});

function updateMonster() {
  // Make the monster oscillate horizontally
  if (monsterDirection === 0) return;

  if (monsterDirection === 1) {
    if (monsterX + monsterImg.width + 1 < canvasWidth) {
      monsterX += monsterSpeed;
    } else {
      monsterDirection = -1;
    }
  } else {
    if (monsterX - 1 > 0) {
      monsterX -= monsterSpeed;
    } else {
      monsterDirection = 1;
    }
  }

  drawMonster();
}

function checkCollisions() {
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    if (
      bullet.x + bulletWidth > monsterX &&
      bullet.x < monsterX + monsterImg.width &&
      bullet.y + bulletHeight > monsterY &&
      bullet.y < monsterY + monsterImg.height
    ) {
      // Bullet hit the monster
      bullets.splice(i, 1); // Remove the bullet
      score += 5; // Increase the score
      currScore.textContent = score; // Update the displayed score
      consecutiveMisses = 0;
      // Respawn the monster
      monsterX = Math.random() * (canvasWidth - monsterImg.width);
      monsterY = 0;

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
      if (score >= 50) {
        monsterSpeed = 10;
      }
    }
  }
}

function endGame() {
  gameState = "ended";
  canvas.style.backgroundColor = "red"; // Set the background color to red
  gameOverSound.play(); // Play a game over sound effect

  // Clear the entire canvas
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  monsterX = canvasWidth / 2 - monsterImg.width / 2;
  monsterY = 0;

  if (score > highScore) {
    highScore = score;
    maxScore.textContent = highScore;
    localStorage.setItem("highScore", highScore);
  }

  // Reset game variables
  score = 0;
  currScore.textContent = score;
  consecutiveMisses = 0;
  monsterDirection = 0;
  gameStarted = false;
  bullets = [];
}

function update() {
  drawGun();
  drawBullets();
  updateMonster();
  checkCollisions();

  maxScore.textContent = highScore;

  // Update bullet positions
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 5; // Adjust this to control bullet speed
    if (bullets[i].y < 0) {
      consecutiveMisses += 1;
      score -= 2; // Increase the score
      currScore.textContent = score;
      console.log(consecutiveMisses);
      if (consecutiveMisses >= 3) {
        endGame();
      }
      bullets.splice(i, 1); // Remove bullets that go out of the canvas
    }
  }

  requestAnimationFrame(update);
}

btn.addEventListener("click", () => {
  if (gameStarted === false) {
    monsterDirection = 1;
    canvas.style.backgroundColor = "black";
    monsterX = canvasWidth / 2 - monsterImg.width / 2;
    gameStarted = true;
    update();
  }
});
