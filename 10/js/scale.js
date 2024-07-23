import {
  preview, scaleControl, buttonControlBigger, buttonControlSmaller
} from './elements.js';

const Scale = {
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
  const value = parseInt(scaleControl.value, 10);
  if (value > Scale.MIN) {
    setScale(value - Scale.STEP);
  }
}
);


buttonControlBigger.addEventListener('click', () => {
  let value = parseInt(scaleControl.value, 10);
  if (value < Scale.MAX) {
    value = `${value + Scale.STEP}`;
    setScale(value);
  }
});

const resetScale = () => {
  setScale(Scale.DEFAULT);
};

export { resetScale };
