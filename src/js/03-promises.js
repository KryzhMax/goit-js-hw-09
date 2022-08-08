import { Notify } from 'notiflix/build/notiflix-notify-aio';

// References

const refs = {
  formRef: document.querySelector('.form'),
  delayRef: document.querySelector('[name="delay"]'),
  stepRef: document.querySelector('[name="step"]'),
  amountRef: document.querySelector('[name="amount"]'),
};

const { formRef, delayRef, stepRef, amountRef } = refs;

// Functions
function addAmount(event) {
  event.preventDefault();

  let DELAY = Number(delayRef.value);
  let STEP = Number(stepRef.value);
  for (let i = 1; i <= amountRef.value; i++) {
    DELAY += STEP;
    createPromise(i, DELAY)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Listeners

formRef.addEventListener('submit', addAmount);
