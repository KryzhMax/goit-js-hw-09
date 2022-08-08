import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// References
const inputRef = document.querySelector('#datetime-picker');
const btnRef = document.querySelector('button[data-start]');

const elementsRef = {
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
const { dataDays, dataHours, dataMinutes, dataSeconds } = elementsRef;

let timeId = null;
toDisableBtn(btnRef);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }
    toDisableBtn(btnRef);
  },
};

// Functions
const flatPickrInput = flatpickr(inputRef, options);

function renderTimer() {
  const remainingTime = remainingTimer(
    flatPickrInput.selectedDates[0].getTime()
  );
  console.log(remainingTime)

  dataDays.textContent = addPadString(convertMs(remainingTime).days);
  dataHours.textContent = addPadString(convertMs(remainingTime).hours);
  dataMinutes.textContent = addPadString(convertMs(remainingTime).minutes);
  dataSeconds.textContent = addPadString(convertMs(remainingTime).seconds);
}

const remainingTimer = time => {
  return time - Date.now();
};

function toDisableBtn(btn) {
  btn.disabled = !btn.disabled;
}

function onBtn() {
  const remainingTime = remainingTimer(
    flatPickrInput.selectedDates[0].getTime()
  );
  toDisableBtn(btnRef);
  toDisableBtn(inputRef);
  Notify.success('choco-laca Boom-Boom');
  timeId = setInterval(renderTimer, 1000);
  setTimeout(() => {
    clearInterval(timeId);
    toDisableBtn(inputRef);
  }, remainingTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addPadString(value) {
  return String(value).padStart(2, '0');
}

// Listeners

btnRef.addEventListener('click', onBtn);
