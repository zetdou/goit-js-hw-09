const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener("click", ev => {
    const colorChange = getRandomHexColor();
    document.body.style.backgroundColor = colorChange;
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  //btnStart.setAttribute('disabled', '');