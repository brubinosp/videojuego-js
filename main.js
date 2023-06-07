/**
 * @type {HTMLCanvasElement} //permite mostrar los metodos de canvas
 */

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");
const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const result = document.querySelector("#result");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;
let moveX = 0;
let moveY = 0;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const initialPlayerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let bombsPositions = [];

function setCanvasSize() {
  window.innerHeight > window.innerWidth
    ? (canvasSize = Math.round(window.innerWidth * 0.7))
    : (canvasSize = Math.round(window.innerHeight * 0.7));
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementsSize = canvasSize / 10;
  startGame();
  playerPosition.x = initialPlayerPosition.x + elementsSize * moveX;
  playerPosition.y = initialPlayerPosition.y + elementsSize * moveY;
}

function startGame() {
  context.font = elementsSize + "px verdana";
  context.textAlign = "end";
  const mapsArray = maps[level];
  if (!mapsArray) {
    gameWin();
    return;
  }
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
  showLives();
  context.clearRect(0, 0, canvasSize, canvasSize);
  const map = mapsArray.match(/[IXO\-]+/g).map((row) => row.split(""));
  bombsPositions = [];
  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colIndex + 1);
      const posY = elementsSize * (rowIndex + 1);
      if (col === "O") {
        initialPlayerPosition.x = posX;
        initialPlayerPosition.y = posY;
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col === "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === "X") {
        bombsPositions.push({
          x: posX,
          y: posY,
        });
      }
      context.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  const playerGiftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const playerGiftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  if (playerGiftCollisionX && playerGiftCollisionY) {
    level++;
    moveX = 0;
    moveY = 0;
    startGame();
  }
  const bombsCollision = bombsPositions.find((elem) => {
    const collisionX = playerPosition.x.toFixed(3) == elem.x.toFixed(3);
    const collisionY = playerPosition.y.toFixed(3) == elem.y.toFixed(3);
    return collisionX && collisionY;
  });
  if (bombsCollision) {
    moveX = 0;
    moveY = 0;
    result.innerHTML = "Damn, you failed!!";
    levelFailed();
  }
  context.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function gameWin() {
  const recordTime = localStorage.getItem("recordTime");
  const playerTime = Date.now() - timeStart;
  if (!recordTime) {
    clearInterval(timeInterval);
    localStorage.setItem("recordTime", playerTime);
    result.innerHTML =
      "Oh! I see, it is your first time, try to beat your mark!";
  } else {
    if (recordTime > playerTime) {
      clearInterval(timeInterval);
      localStorage.setItem("recordTime", playerTime);
      result.innerHTML = `Congrats, your time is ${playerTime}, it is a new record! Amazing!!`;
    } else if (recordTime <= playerTime) {
      clearInterval(timeInterval);
      result.innerHTML =
        "You are fast but not so fast! Keep trying to break a record.";
    }
  }
}

function levelFailed() {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function showLives() {
  const hearts = Array(lives).fill(emojis["HEART"]);
  spanLives.innerHTML = ""; // Para limpiar el span y evitar repeticion de corazones
  hearts.forEach((heart) => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem("recordTime");
}

buttonUp.addEventListener("click", moveUp);
buttonLeft.addEventListener("click", moveLeft);
buttonRight.addEventListener("click", moveRight);
buttonDown.addEventListener("click", moveDown);
window.addEventListener("keydown", moveByKeys);

function moveUp() {
  if (+playerPosition.y.toFixed(3) - elementsSize <= 0) {
    console.log("OUT");
  } else {
    moveY--;
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  if (+playerPosition.x.toFixed(3) - elementsSize <= 0) {
    console.log("OUT");
  } else {
    moveX--;
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  if (+playerPosition.x.toFixed(3) + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    moveX++;
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  if (+playerPosition.y.toFixed(3) + elementsSize > canvasSize) {
    console.log("OUT");
  } else {
    moveY++;
    playerPosition.y += elementsSize;
    startGame();
  }
}

function moveByKeys(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowDown":
      moveDown();
      break;
  }
}
