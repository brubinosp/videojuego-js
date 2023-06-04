/**
 * @type {HTMLCanvasElement} //permite mostrar los metodos de canvas
 */

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

function setCanvasSize() {
  window.innerHeight > window.innerWidth
    ? (canvasSize = window.innerWidth * 0.8)
    : (canvasSize = window.innerHeight * 0.8);
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementsSize = canvasSize / 10;
  startGame();
}

function startGame() {
  context.font = elementsSize * 1 + "px verdana";
  context.textAlign = "end";

  const map = maps[0].match(/[IXO\-]+/g).map((row) => row.split(""));

  context.clearRect(0, 0, canvasSize, canvasSize);
  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colIndex + 1 + 0.2);
      const posY = elementsSize * ((rowIndex + 1) * 0.98);
      if (col === "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX * 0.94;
          playerPosition.y = posY;
        }
      }
      context.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  context.font = elementsSize * 0.9 + "px verdana";
  context.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");

buttonUp.addEventListener("click", moveUp);
buttonLeft.addEventListener("click", moveLeft);
buttonRight.addEventListener("click", moveRight);
buttonDown.addEventListener("click", moveDown);
window.addEventListener("keydown", moveByKeys);

function moveUp() {
  console.log(playerPosition.y - elementsSize + ": " + elementsSize);
  playerPosition.y - elementsSize < elementsSize
    ? console.log("OUT")
    : (playerPosition.y -= elementsSize * 0.975);
  startGame();
}
function moveLeft() {
  console.log(playerPosition.x - elementsSize + ": " + elementsSize);
  playerPosition.x - elementsSize < elementsSize
    ? console.log("OUT")
    : (playerPosition.x -= elementsSize * 0.99);
  startGame();
}
function moveRight() {
  console.log(playerPosition.x + elementsSize + ": " + canvasSize);
  playerPosition.x + elementsSize  > canvasSize + elementsSize
    ? console.log("OUT")
    : (playerPosition.x += elementsSize * 0.99);
  startGame();
}
function moveDown() {
  console.log(playerPosition.y + elementsSize + ": " + canvasSize);
  playerPosition.y + elementsSize > canvasSize
    ? console.log("OUT")
    : (playerPosition.y += elementsSize * 0.975);
  startGame();
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
