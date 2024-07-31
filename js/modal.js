import { isEscapeKey } from './util.js';

const ModalType = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


const modalTypeToTemplate = {
  [ModalType.SUCCESS]: successTemplate,
  [ModalType.ERROR]: errorTemplate,
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showModal = (type) => {
  const modal = modalTypeToTemplate[type].cloneNode(true);
  const button = modal.querySelector(`.${type}__button`);

  button.addEventListener('click', () => {
    closeModal();
  });

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.appendChild(modal);
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

export { showModal, ModalType };
