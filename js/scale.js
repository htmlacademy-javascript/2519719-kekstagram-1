import {
  preview, scaleControl
} from './elements.js';

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');

const scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const setScale = (value) => {
  scaleControl.value = `${value}%`;
  const newValue = parseFloat(value) / 100;
  preview.style.transform = `scale(${newValue})`;
};

buttonControlSmaller.addEventListener('click', () => {
  let value = scaleControl.value;
  value = parseInt(value, 10);
  if (value >= scale.MIN) {
    value = `${value - scale.STEP}`;
    setScale(value);
  }
});


buttonControlBigger.addEventListener('click', () => {
  let value = scaleControl.value;
  value = parseInt(value, 10);
  if (value < scale.MAX) {
    value = `${value + scale.STEP}`;
  } else {
    value = scale.DEFAULT;
  }
  setScale(value);
});
