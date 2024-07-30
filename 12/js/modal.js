import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 2000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const ModalType = {
  SUCCESS: 'success',
  ERROR: 'error',
};

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeModal();
  }
}

export { showModal, showAlert, ModalType };
