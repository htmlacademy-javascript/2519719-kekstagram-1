import {
  preview, effectLevel, sliderElement, valueElement
} from './elements.js';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
});

const effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilterName = {
  [effect.NONE]: 'none',
  [effect.CHROME]: 'grayscale',
  [effect.SEPIA]: 'sepia',
  [effect.MARVIN]: 'invert',
  [effect.PHOBOS]: 'blur',
  [effect.HEAT]: 'brightness',
};

const EFFECT_CONFIG = {
  [effect.NONE]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    measure: ''
  },
  [effect.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    measure: ''
  },
  [effect.SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    measure: ''
  },
  [effect.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    measure: '%'
  },
  [effect.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    measure: 'px'
  },
  [effect.HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    measure: ''
  },
};

function setInitialSliderState(value) {
  const sliderCofigValue = EFFECT_CONFIG[value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': sliderCofigValue.range.min,
      'max': sliderCofigValue.range.max
    }
  });
  sliderElement.noUiSlider.set(sliderCofigValue.range.max);
}

const applyFilter = () => {
  valueElement.value = sliderElement.noUiSlider.get();
  const selectedValue = document.querySelector('.effects__radio:checked').value;
  preview.style.filter = `${effectToFilterName[selectedValue]}(${valueElement.value}${EFFECT_CONFIG[selectedValue].measure})`;
};


document.querySelector('.effects__list').addEventListener('change', () => {
  effectLevel.classList.add('hidden');
  const selectedValue = document.querySelector('.effects__radio:checked').value;
  if (selectedValue === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
  preview.className = 'img-upload__preview';
  const effectClass = effectToFilterName[selectedValue];
  preview.classList.add(effectClass);
  setInitialSliderState(selectedValue);

  applyFilter();
});


sliderElement.noUiSlider.on('update', () =>
  applyFilter());
