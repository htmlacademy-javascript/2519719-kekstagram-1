import {
  uploadOverlay, formCancelButton, scaleControl, uploadFile, effectLevelValue, effectsRadio, textDescription, textHashtags
} from './elements.js';

const form = document.querySelector('.img-upload__form');

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  formCancelButton.addEventListener('click', onButtonCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const uploadInput = document.getElementById('upload-file');
uploadInput.addEventListener('change', openForm);

const removeEventListeners = () => {
  uploadInput.removeEventListener('change', openForm);
  formCancelButton.removeEventListener('click', onButtonCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const cancelForm = () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  scaleControl.value = '55%';
  uploadFile.value = '';
  effectLevelValue.value = '';
  effectsRadio.value = 'none';
  textHashtags.value = '';
  textDescription.value = '';
  removeEventListeners();
};

function onButtonCancelClick(evt) {
  evt.preventDefault();
  cancelForm();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    if (textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      cancelForm();
    }
  }
}
openForm();


const pristine = new Pristine(form);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    evt.target.submit();
  }
});


function validateHashtag(value) {
  const hashtags = value.split(' ');
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const seen = {};

  if (hashtags.length > 5) {
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!regexp.test(hashtags[i])) {
      return false;
    }

    const normalizedTag = hashtags[i].toLowerCase();

    if (seen[normalizedTag]) {
      return false;
    }

    seen[normalizedTag] = true;
  }


  return true;
}


function validateTextDescription(value) {
  return value.length < 140;
}

pristine.addValidator('[name="hashtags"]', validateHashtag);
pristine.addValidator('[name="description"]', validateTextDescription);
