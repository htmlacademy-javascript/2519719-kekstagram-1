import {
  uploadOverlay, formCancelButton, textDescription, textHashtags, form,
  uploadInput
} from './elements.js';


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

const cancelForm = () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  form.reset();
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

const pristine = new Pristine(form);


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const validateHashtagCount = (value) => {
  const hashtags = value.split(' ');
  return hashtags.length < 5;
};

const validateHashtagUnique = (value) => {
  const hashtags = value.split(' ');
  const seen = {};

  for (let i = 0; i < hashtags.length; i++) {
    const normalizedTag = hashtags[i].toLowerCase().trim();

    if (seen[normalizedTag]) {
      return false;
    }
    seen[normalizedTag] = true;
  }
  return true;
};

const validateHashtagLength = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    const isValid = hashtags[i].length <= 20 && hashtags[i].length > 1;
    if (!isValid) {
      return false;
    }
  }
  return true;
};

const validateHashtagSymbol = (value) => {
  if (value === '') {
    return true;
  }

  const hashtags = value.split(' ');
  const regexp = /^#[a-zа-яё0-9]+$/i;

  for (let i = 0; i < hashtags.length; i++) {
    const isValid = regexp.test(hashtags[i]);
    if (!isValid) {
      return false;
    }
  }
};

pristine.addValidator(textHashtags, validateHashtagCount, 'Максимальное число хештегов - 5');
pristine.addValidator(textHashtags, validateHashtagLength, 'Максимальная длина одного хэш-тега 20 символов, включая решётку');
pristine.addValidator(textHashtags, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(textHashtags, validateHashtagSymbol, 'строка после решётки должна состоять из букв и чисел');
