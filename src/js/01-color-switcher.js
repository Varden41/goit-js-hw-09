// refs
const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

start.addEventListener('click', onStart);
stop.addEventListener('click', onStop);
function onStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    start.disabled = true;
  }, 1000);
}
function onStop() {
  clearInterval(timerId);
  start.disabled = false;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
