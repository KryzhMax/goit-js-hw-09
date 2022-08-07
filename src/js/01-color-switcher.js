// Refs

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

let timeId = null;
// Functions

function onStartBtn(event) {
  console.dir(event);
  timeId = setInterval(() => {
    const color = getRandomHexColor();
    bodyRef.style.backgroundColor = color;
  }, 1000);
  event.stopPropagation();

  toDisable(startBtn, stopBtn);
}

function onStopBtn() {
  clearInterval(timeId);
  bodyRef.style.backgroundColor = '#fff';
  toDisable(stopBtn, startBtn);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toDisable(start, stop) {
  start.disabled = true;
  stop.disabled = false;
}

// Listeners

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
