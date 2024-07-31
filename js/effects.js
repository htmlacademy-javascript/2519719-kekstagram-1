import {
  preview, effectLevel, sliderElement, valueElement
} from './elements.js';

const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const EFFECT_CONFIG = {
  [Effect.NONE]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    measure: ''
  },
  [Effect.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    measure: ''
  },
  [Effect.SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    measure: ''
  },
  [Effect.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    measure: '%'
  },
  [Effect.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    measure: 'px'
  },
  [Effect.HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    measure: ''
  },
};

const effectToFilterName = {
  [Effect.NONE]: 'none',
  [Effect.CHROME]: 'grayscale',
  [Effect.SEPIA]: 'sepia',
  [Effect.MARVIN]: 'invert',
  [Effect.PHOBOS]: 'blur',
  [Effect.HEAT]: 'brightness',
};

let currentFilter = '';

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECT_CONFIG[Effect.NONE].range.min,
    max: EFFECT_CONFIG[Effect.NONE].range.max,
  },
  start: EFFECT_CONFIG[Effect.NONE].start,
  connect: 'lower',
  step: EFFECT_CONFIG[Effect.NONE].step,

});


const setInitialSliderState = (value) => {
  const config = EFFECT_CONFIG[value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: config.range.min,
      max: config.range.max
    },
    start: config.start,
    step: config.step,
  });
};

const applyFilter = () => {
  valueElement.value = sliderElement.noUiSlider.get();
  const selectedValue = document.querySelector('.effects__radio:checked').value;
  preview.style.filter = `${effectToFilterName[selectedValue]}(${valueElement.value}${EFFECT_CONFIG[selectedValue].measure})`;
  currentFilter = selectedValue;
};

document.querySelector('.effects__list').addEventListener('change', () => {
  const selectedValue = document.querySelector('.effects__radio:checked').value;
  if (selectedValue === 'none') {
    effectLevel.classList.add('hidden');
    preview.style.filter = 'none';
  } else {
    effectLevel.classList.remove('hidden');
  }
  preview.classList.remove(`effects__preview--${currentFilter}`);
  preview.classList.add(`effects__preview--${selectedValue}`);
  setInitialSliderState(selectedValue);

  applyFilter();
});


sliderElement.noUiSlider.on('update', () =>
  applyFilter());
