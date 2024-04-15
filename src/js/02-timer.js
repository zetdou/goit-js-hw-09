import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startCounter = document.querySelector('[data-start]');
startCounter.setAttribute('disabled', '');

const countdownDisplay = document.querySelector('.timer');

const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : `${unit}`;
};

const countdown = (targetDate) => {
    const intervalId = setInterval(() => {
        const currentDate = new Date();
        const msDifference = targetDate - currentDate;

        if (msDifference <= 0) {
            clearInterval(intervalId);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(msDifference);

        document.querySelector('[data-days]').textContent = formatTimeUnit(days);
        document.querySelector('[data-hours]').textContent = formatTimeUnit(hours);
        document.querySelector('[data-minutes]').textContent = formatTimeUnit(minutes);
        document.querySelector('[data-seconds]').textContent = formatTimeUnit(seconds);
    }, 1000);
};

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
}

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates, dateStr, instance) {
        if (selectedDates[0] < new Date()) {
            window.alert("Proszę o wybranie daty z przyszłości!!");
        } else {
            startCounter.removeAttribute('disabled', '');
        }
    },
});

startCounter.addEventListener('click', () => {
  const flatpickrInstance = document.querySelector('#datetime-picker')._flatpickr;

  if (flatpickrInstance.latestSelectedDateObj) {
    const selectedTime = flatpickrInstance.latestSelectedDateObj;
    console.log(selectedTime);
    countdown(selectedTime);
  }
});
