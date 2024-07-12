import {
  uploadOverlay, formCancelButton, textDescription, textHashtags, form, preview,
  uploadInput, effectLevel, sliderElement, valueElement, scaleControl, radioButtons
} from './elements.js';

const HASHTAGS_COUNT = 5;
const HASHTAG_LENGTH = 20;
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 0;
const MAX_SLIDER_VALUE = 100;

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  formCancelButton.addEventListener('click', onButtonCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change', () => {
  openForm();
});

const removeEventListeners = () => {
  formCancelButton.removeEventListener('click', onButtonCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const cancelForm = () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  form.reset();
  pristine.reset();
  removeEventListeners();
};

function onButtonCancelClick() {
  cancelForm();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    if (textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      cancelForm();
    }
  }
}


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});


const convertToHashtag = (value) => {
  const trimmedValue = value.trim().toLowerCase();
  const hashtags = trimmedValue.split(' ');
  return hashtags.filter((hashtag) => hashtag);
};


const validateHashtagCount = (value) => {
  const hashtags = convertToHashtag(value);
  return hashtags.length < HASHTAGS_COUNT;
};

const validateHashtagUnique = (value) => {
  const hashtags = convertToHashtag(value);
  const seen = new Set(hashtags);
  return hashtags.length === seen.size;
};

const validateHashtagLength = (value) => {

  const hashtags = convertToHashtag(value);
  return hashtags.every((tag) => tag.length <= HASHTAG_LENGTH);
};


const validateHashtagSymbol = (value) => {
  const hashtags = convertToHashtag(value);
  const regexp = /^#[a-zа-яё0-9]+$/i;

  return hashtags.every((tag) => regexp.test(tag));
};

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');


buttonControlSmaller.onclick = function () {
  let value = scaleControl.value;
  value = parseInt(value, 10);
  if (value > MIN_SCALE) {
    value = `${value - SCALE_STEP}%`;
  } else {
    value = '0%';
  }
  scaleControl.value = value;
  const newValue = parseFloat(value) / 100;
  preview.style.transform = `scale(${newValue})`;
};


buttonControlBigger.onclick = function () {
  let value = scaleControl.value;
  value = parseInt(value, 10);
  if (value < MAX_SCALE) {
    value = `${value + SCALE_STEP}%`;
  } else {
    value = '100%';
  }
  scaleControl.value = value;
  const newValue = parseFloat(value) / 100;
  preview.style.transform = `scale(${newValue})`;
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
});

function setInitialSliderState() {
  sliderElement.noUiSlider.set(MAX_SLIDER_VALUE);
}

const effect = {
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
  'none': 'effects__preview--none'
};

const applyFilter = () => {
  {
    valueElement.value = sliderElement.noUiSlider.get();
    const selectedValue = document.querySelector('.effects__radio:checked').value;
    switch (selectedValue) {
      case 'chrome':
        preview.style.filter = `grayscale(${valueElement.value / 100})`;
        break;
      case 'sepia':
        preview.style.filter = `sepia(${valueElement.value / 100})`;
        break;
      case 'marvin':
        preview.style.filter = `invert(${valueElement.value}%)`;
        break;
      case 'phobos':
        preview.style.filter = `blur(${valueElement.value / 10}px)`;
        break;
      case 'heat':
        preview.style.filter = `brightness(${1 + valueElement.value / 100 * 2})`;
        break;
      default:
        preview.style.filter = 'none';
    }
  }
};

radioButtons.forEach((radioButton) => {
  effectLevel.classList.add('hidden');
  radioButton.addEventListener('change', () => {
    const selectedValue = document.querySelector('.effects__radio:checked').value;
    if (selectedValue === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    preview.className = 'img-upload__preview';
    const effectClass = effect[selectedValue];
    preview.classList.add(effectClass);
    setInitialSliderState();
    applyFilter();
  });
});


sliderElement.noUiSlider.on('update', () =>
  applyFilter());


pristine.addValidator(textHashtags, validateHashtagCount, 'Максимальное число хештегов - 5');
pristine.addValidator(textHashtags, validateHashtagLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');
pristine.addValidator(textHashtags, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(textHashtags, validateHashtagSymbol, 'строка после решётки должна состоять из букв и чисел');
