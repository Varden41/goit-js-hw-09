import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector("[name='delay']"),
  step: document.querySelector("[name='step']"),
  amount: document.querySelector("[name='amount']"),
};
refs.form.addEventListener('submit', e => {
  e.preventDefault();

  let DELAY = Number(refs.delay.value);
  const DELAY_STEP = Number(refs.step.value);

  for (let i = 1; i <= refs.amount.value; i += 1) {
    createPromise(i, DELAY)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    DELAY += DELAY_STEP;
  }
  refs.form.reset();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
