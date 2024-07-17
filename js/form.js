import {
  uploadOverlay, formCancelButton, textDescription, textHashtags, form, uploadInput, preview, effectLevel,
  sliderElement
} from './elements.js';

import { sendData, showSuccessMessage } from './server-data.js';

import { resetScale } from './scale.js';

const HASHTAGS_COUNT = 5;
const HASHTAG_LENGTH = 20;

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  formCancelButton.addEventListener('click', onButtonCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  sliderElement.noUiSlider.reset();
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
  preview.style.filter = 'none';
  resetScale();
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

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    await sendData();
    cancelForm();
    showSuccessMessage();
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

pristine.addValidator(textHashtags, validateHashtagCount, 'Максимальное число хештегов - 5');
pristine.addValidator(textHashtags, validateHashtagLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');
pristine.addValidator(textHashtags, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(textHashtags, validateHashtagSymbol, 'строка после решётки должна состоять из букв и чисел');
