import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

// refs
const refs = {
  timer: document.querySelector('.timer'),
  field: document.querySelectorAll('.field'),
  datePicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timeDays: document.querySelector('[data-days]'),
  timeHours: document.querySelector('[data-hours]'),
  timeMinutes: document.querySelector('[data-minutes]'),
  timeSeconds: document.querySelector('[data-seconds]'),
};

// basic stiles
refs.timer.style.display = 'flex';
refs.timer.style.gap = '20px';

refs.field.forEach(function (field) {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.gap = '10px';
  field.style.alignItems = 'center';
  field.firstElementChild.style.fontSize = '42px';
});

refs.startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;

    console.log(selectedDates[0]);
  },
};

const fP = flatpickr('#datetime-picker', options);

// timer

refs.startBtn.addEventListener('click', onStart);

function onStart() {
  refs.startBtn.disabled = true;
  const startTime = fP.selectedDates[0].getTime();
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const timerTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    updateTimer({ days, hours, minutes, seconds });
    console.log(`${days}::${hours}::${minutes}::${seconds}`);
    if (Number(seconds) === 0) {
      refs.startBtn.disabled = false;
      clearInterval(timerId);
      return;
    }
  }, 1000);
}

// function

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timeDays.textContent = `${days}`;
  refs.timeHours.textContent = `${hours}`;
  refs.timeMinutes.textContent = `${minutes}`;
  refs.timeSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
