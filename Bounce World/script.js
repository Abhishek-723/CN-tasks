const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 100,
  y: 300,
  width: 30,
  height: 50,
  jumping: false,
  velocityY: 0,
  speed: 4,
};

const gravity = 0.2;
const jumpForce = -10;
const maxJumpTime = 2000;
const maxFallSpeed = 5;

const platforms = [
  { x: 0, y: 350, width: canvas.width, height: 50 },
  { x: 200, y: 280, width: 100, height: 20 },
  { x: 400, y: 200, width: 100, height: 20 },
  { x: 600, y: 150, width: 100, height: 20 },
  { x: 700, y: 100, width: 100, height: 20 },
];

const spikes = [
  { x: 350, y: 320, width: 50, height: 30 },
  { x: 500, y: 170, width: 50, height: 30 },
];

let gameRunning = false;

document.getElementById("startButton").addEventListener("click", () => {
  gameRunning = true;
  gameLoop();
});

let isJumping = false;

function isPlayerJumping() {
  return player.jumping;
}

document.addEventListener("keyup", function (event) {
  if (event.key === "Space" && isJumping) {
    isJumping = false;
  }
});

function isColliding(objA, objB) {
  return (
    objA.x < objB.x + objB.width &&
    objA.x + objA.width > objB.x &&
    objA.y < objB.y + objB.height &&
    objA.y + objA.height > objB.y
  );
}

function updatePlayerPosition() {
  if (player.jumping) {
    player.y += player.velocityY;
    player.velocityY += 0.2;
    if (player.velocityY > maxFallSpeed) {
      player.velocityY = 0;
    }
    // console.log(player.velocityY);
    // if()

    // Check for collisions with platforms
    platforms.forEach((platform) => {
      if (isColliding(player, platform)) {
        // Adjust player position to rest on top of the platform
        player.y = platform.y - player.height;
        player.jumping = false;
        doubleJumpUsed = false;
        player.velocityY = 0;
      }
    });
  }

  // Limit player position to stay within the canvas boundaries
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
}

function endGame() {
  gameRunning = false;
  alert("Game Over. Your Score: " + score);
  document.location.reload();
}

let hasDoubleJump = false;
let doubleJumpUsed = false;

const doubleJumpPowerup = {
  x: 450,
  y: 100,
  width: 30,
  height: 30,
};

const enemy = {
  x: 650,
  y: 320,
  width: 30,
  height: 30,
  speed: 2,
  direction: -1,
};

const airControlFactor = 0.5;
const maxAirSpeed = 3;

document.addEventListener("keydown", function (event) {
  if (event.key === " " && (isJumping || player.jumping === false)) {
    if (!isJumping) {
      player.jumping = true;
      player.velocityY = jumpForce;
    } else if (!doubleJumpUsed && hasDoubleJump) {
      doubleJumpUsed = true;
      player.velocityY = jumpForce;
    }
  }
  if (event.key === "ArrowLeft") {
    // Move left
    player.x -= player.speed;
  } else if (event.key === "ArrowRight") {
    // Move right
    player.x += 30;
  }
});

let score = 0;

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  updatePlayerPosition();

  // Update player position
  //   if (player.jumping) {
  //     player.y += player.velocityY;
  //     player.velocityY += gravity;
  //     if (player.y > 300) {
  //       player.y = 300;
  //       player.jumping = false;
  //       doubleJumpUsed = false;
  //     }
  //   }

  // Draw platforms
  ctx.fillStyle = "green";
  platforms.forEach((platform) => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });

  // Draw spikes
  ctx.fillStyle = "red";
  spikes.forEach((spike) => {
    ctx.fillRect(spike.x, spike.y, spike.width, spike.height);
    if (isColliding(player, spike)) {
      endGame();
    }
  });

  // Draw double jump power-up
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    doubleJumpPowerup.x,
    doubleJumpPowerup.y,
    doubleJumpPowerup.width,
    doubleJumpPowerup.height
  );

  if (isColliding(player, doubleJumpPowerup)) {
    hasDoubleJump = true;
    doubleJumpPowerup.x = -100;
    doubleJumpPowerup.y = -100;
  }

  // Calculate enemy's oscillatory motion
  const oscillationPeriod = 4000; // 2 seconds in milliseconds
  const oscillationAmplitude = canvas.width - enemy.width; // Full canvas width
  let enemyX =
    canvas.width / 2 -
    oscillationAmplitude *
      Math.sin((Date.now() / oscillationPeriod) * (2 * Math.PI)) -
    enemy.width / 2;

  // Ensure the enemy stays within the canvas
  enemyX = Math.max(0, Math.min(canvas.width - enemy.width, enemyX));

  enemy.x = enemyX;

  // Draw enemy
  ctx.fillStyle = "purple";
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

  if (isColliding(player, enemy)) {
    endGame();
  }

  // Update score
  score++;
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(gameLoop);
}

window.isPlayerJumping = isPlayerJumping;
window.score = score;
window.player = player;
window.gameLoop = gameLoop;
window.gameRunning = gameRunning;
window.spikes = spikes;
window.enemy = enemy;
