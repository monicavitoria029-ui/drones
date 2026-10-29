
const drone = document.getElementById("drone");
const statusText = document.getElementById("status");
const altitudeText = document.getElementById("altitude");
const speedText = document.getElementById("speed");
const flightArea = document.getElementById("flightArea");

let flying = false;
let altitude = 0;
let x = 0;
let y = 0;
let rotation = 0;
let speed = 0;

const maxAltitude = 120;
const step = 20;

function updateDisplay() {
  drone.style.transform =
    `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

  altitudeText.textContent = altitude + " m";
  speedText.textContent = speed + " km/h";

  if (flying) {
    statusText.textContent = "EM VOO";
    statusText.style.color = "#36d98a";
  } else {
    statusText.textContent = "NO SOLO";
    statusText.style.color = "#36b4f4";
  }
}

function takeoff() {
  if (flying) return;

  flying = true;
  altitude = 10;
  speed = 0;
  updateDisplay();
}

function land() {
  if (!flying) return;

  flying = false;
  altitude = 0;
  speed = 0;
  x = 0;
  y = 0;
  rotation = 0;

  updateDisplay();
}

function resetSimulator() {
  flying = false;
  altitude = 0;
  speed = 0;
  x = 0;
  y = 0;
  rotation = 0;

  updateDisplay();
}

function moveDrone(direction) {
  if (!flying) {
    statusText.textContent = "DECOLE PRIMEIRO";
    return;
  }

  const boundsX = flightArea.clientWidth / 2 - 80;
  const boundsY = flightArea.clientHeight / 2 - 60;

  if (direction === "up") {
    y = Math.max(y - step, -boundsY);
  }

  if (direction === "down") {
    y = Math.min(y + step, boundsY);
  }

  if (direction === "left") {
    x = Math.max(x - step, -boundsX);
  }

  if (direction === "right") {
    x = Math.min(x + step, boundsX);
  }

  speed = 15;
  updateDisplay();
}

function changeAltitude(value) {
  if (!flying) {
    statusText.textContent = "DECOLE PRIMEIRO";
    return;
  }

  altitude = Math.max(1, Math.min(maxAltitude, altitude + value));
  speed = 5;
  updateDisplay();
}

function rotateDrone() {
  if (!flying) {
    statusText.textContent = "DECOLE PRIMEIRO";
    return;
  }

  rotation += 45;
  speed = 5;
  updateDisplay();
}

document.getElementById("takeoff").addEventListener("click", takeoff);
document.getElementById("land").addEventListener("click", land);
document.getElementById("reset").addEventListener("click", resetSimulator);

document.getElementById("up").addEventListener("click", () => moveDrone("up"));
document.getElementById("down").addEventListener("click", () => moveDrone("down"));
document.getElementById("left").addEventListener("click", () => moveDrone("left"));
document.getElementById("right").addEventListener("click", () => moveDrone("right"));

document.getElementById("increaseAltitude").addEventListener("click", () => changeAltitude(5));
document.getElementById("decreaseAltitude").addEventListener("click", () => changeAltitude(-5));

document.getElementById("rotate").addEventListener("click", rotateDrone);

document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
  }

  if (event.key === "ArrowUp") moveDrone("up");
  if (event.key === "ArrowDown") moveDrone("down");
  if (event.key === "ArrowLeft") moveDrone("left");
  if (event.key === "ArrowRight") moveDrone("right");
  if (event.key === " ") rotateDrone();
});

updateDisplay();
