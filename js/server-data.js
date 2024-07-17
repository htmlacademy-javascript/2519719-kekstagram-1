import { body } from './elements.js';

const getPhotos = async () => {
  try {
    const response = await fetch('https://28.javascript.htmlacademy.pro/kekstagram/data');
    const photos = await response.json();
    return photos;
  } catch (error) {
    document.querySelector('.global-error').classList.remove('hidden');
  }

};

const showErrorMessage = () => {
  const errorMessage = document.querySelector('#error').innerHTML;
  body.insertAdjacentHTML('beforeend', errorMessage);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.querySelector('.error__button').addEventListener('click', onButtonErrorClick);
  body('body').addEventListener('click', onButtonErrorClick);
};

const sendData = async () => {
  try {

    const formId = document.querySelector('#upload-select-image');
    const response = await fetch('https://28.javascript.htmlacademy.pro/kekstagram1', {
      method: 'POST',
      body: new FormData(formId)
    });

    if (!response.ok) {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  } catch (error) {
    showErrorMessage();
    throw error;
  }
};

const showSuccessMessage = () => {
  const successMessage = document.querySelector('#success').innerHTML;
  body.insertAdjacentHTML('beforeend', successMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('.success__button').addEventListener('click', onButtonSuccessClick);
  body.addEventListener('click', onButtonSuccessClick);
};

const removeEventListeners = () => {
  document.querySelector('.success__button').removeEventListener('click', onButtonSuccessClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onButtonSuccessClick);
};

const removeEventListenersOnError = () => {
  document.querySelector('.error__button').removeEventListener('click', onButtonErrorClick);
  document.removeEventListener('keydown', onDocumentKeydownError);
  body.removeEventListener('click', onButtonErrorClick);
};

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  removeEventListeners();
  successMessage.remove();
};

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  removeEventListenersOnError();
  errorMessage.remove();
};


function onButtonSuccessClick() {
  closeSuccessMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}
function onDocumentKeydownError(evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}

function onButtonErrorClick() {
  closeErrorMessage();
}


export { getPhotos, sendData, showSuccessMessage };
