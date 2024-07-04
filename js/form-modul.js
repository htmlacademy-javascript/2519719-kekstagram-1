import {
    uploadOverlay, formCancelButton, scaleControl, uploadFile, effectLevelValue, effectsRadio,
    textHashtags, textDescription
} from './elements.js';

const form = document.querySelector('.img-upload__form')

const openForm = () => {
    uploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    formCancelButton.addEventListener('click', onButtonCancelClick)
    document.addEventListener('keydown', onDocumentKeydown);
}

const uploadInput = document.getElementById('upload-file');
uploadInput.addEventListener('change', openForm)

const removeEventListeners = () => {
    uploadInput.removeEventListener('change', openForm)
    formCancelButton.removeEventListener('click', onButtonCancelClick)
    document.removeEventListener('keydown', onDocumentKeydown);
};

const cancelForm = () => {
    uploadOverlay.classList.add('hidden')
    document.querySelector('body').classList.remove('modal-open');
    scaleControl.value = '55%'
    uploadFile.value = ''
    effectLevelValue.value = ''
    effectsRadio.value = 'none'
    textHashtags.value = ''
    textDescription.value = ''
    removeEventListeners();
}

function onButtonCancelClick(evt) {
    evt.preventDefault();
    cancelForm();
}

function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
        cancelForm();
    }
}
openForm()


const pristine = new Pristine(form);


form.addEventListener('submit', (evt) => {
    console.log(123)
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
        console.log('Можно отправлять');
    } else {
        console.log('Форма невалидна');
    }
});



function validateHashtag(value) {
    const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
    return regexp.test(value)
}

function validateTextDescription(value) {
    return value.length < 140
}

pristine.addValidator('[name="hashtags"]', validateHashtag);
pristine.addValidator('[name="description"]', validateTextDescription);