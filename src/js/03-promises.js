import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.getElementsByName('delay'),
  step: document.getElementsByName('step'),
  amount: document.getElementsByName('amount'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
