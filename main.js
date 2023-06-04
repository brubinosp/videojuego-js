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
  for (let index = 1; index < 10; index++) {
    context.fillText(emojis["X"], elementsSize * index, elementsSize);
  }
}
