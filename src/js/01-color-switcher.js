const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

btnStart.addEventListener('click', changeColor);
btnStop.addEventListener('click', () => {
    clearInterval(intervalId);
    btnStart.removeAttribute('disabled', '');
});

function changeColor() {
    btnStart.setAttribute('disabled', '')
    intervalId = setInterval(() => {
    const getColor = getRandomHexColor();
    document.body.style.backgroundColor = getColor;
 }, 1000);
};











