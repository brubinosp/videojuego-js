/**
 * @type {HTMLCanvasElement} //permite mostrar los metodos de canvas
 */

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementsSize;

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

  // const mapsRow = maps[0].trim().split("\n"); const map = mapsRow.map((row) => row.trim().split(""));
  const map = maps[0].match(/[IXO\-]+/g).map((row) => row.split(""));

  context.clearRect(0,0,canvasSize, canvasSize);
  map.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colIndex + 1 + 0.2);
      const posY = elementsSize * ((rowIndex + 1) * 0.98);
      context.fillText(emoji, posX, posY);
    });
  });
}
