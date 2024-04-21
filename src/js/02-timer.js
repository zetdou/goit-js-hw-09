import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// const startCounter = document.querySelector('[data-start]');
// startCounter.setAttribute('disabled', '');

// const countdownDisplay = document.querySelector('.timer');

// const formatTimeUnit = (unit) => {
//     return unit < 10 ? `0${unit}` : `${unit}`;
// };

// const countdown = (targetDate) => {
//     const intervalId = setInterval(() => {
//         const currentDate = new Date();
//         const msDifference = targetDate - currentDate;

//         if (msDifference <= 0) {
//             clearInterval(intervalId);
//             return;
//         }

//         const { days, hours, minutes, seconds } = convertMs(msDifference);

//         document.querySelector('[data-days]').textContent = formatTimeUnit(days);
//         document.querySelector('[data-hours]').textContent = formatTimeUnit(hours);
//         document.querySelector('[data-minutes]').textContent = formatTimeUnit(minutes);
//         document.querySelector('[data-seconds]').textContent = formatTimeUnit(seconds);
//     }, 1000);
// };

// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
// }

// flatpickr('#datetime-picker', {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates, dateStr, instance) {
//         if (selectedDates[0] < new Date()) {
//             window.alert("Proszę o wybranie daty z przyszłości!!");
//         } else {
//             startCounter.removeAttribute('disabled', '');
//         }
//     },
// });

// startCounter.addEventListener('click', () => {
//   const flatpickrInstance = document.querySelector('#datetime-picker')._flatpickr;

//   if (flatpickrInstance.latestSelectedDateObj) {
//     const selectedTime = flatpickrInstance.latestSelectedDateObj;
//     countdown(selectedTime);
//   }
// });

const startButton = document.querySelector("[data-start]");
startButton.setAttribute("disabled", "");
const daysText = document.querySelector("[data-days]");
const hoursText = document.querySelector("[data-hours]");
const minutesText = document.querySelector("[data-minutes]");
const secondsText = document.querySelector("[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const now = new Date();
      if (selectedDate <= now) {
        window.alert("Please choose a date in the future!!");
      } else {
        startButton.removeAttribute("disabled");
        startButton.dataset.start = selectedDate;
      }
    },
  };

flatpickr("#datetime-picker", options);

startButton.addEventListener("click", ev => {
    const { start } = ev.currentTarget.dataset;
    const timeThen = new Date(start);
    let interval = null;
    interval = setInterval (() => {
        const timeNow = new Date();
        const timeLeft = timeThen.getTime() - timeNow.getTime();

        const timeLeftObj = convertMs(timeLeft);
        if (timeLeft >= 0) {
          daysText.innerText = `${timeLeftObj.days}`.padStart(2, "0");
          hoursText.innerText = `${timeLeftObj.hours}`.padStart(2, "0");
          minutesText.innerText = `${timeLeftObj.minutes}`.padStart(2, "0");
          secondsText.innerText = `${timeLeftObj.seconds}`.padStart(2, "0");
        }

        if (timeLeft <= 0) clearInterval(interval);
    }, 1000);
});

  function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    };
  


