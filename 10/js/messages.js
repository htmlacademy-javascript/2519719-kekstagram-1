import { body } from './elements.js';
import { isEscapeKey } from './util.js';

let onKeydownListener;
let onBodyClickListener;
let onButtonClickListener;

let button;
let modalInner;

const showModal = (selector, buttonSelector) => {
  const modal = document.querySelector(selector);
  const message = modal.innerHTML;
  const modalWrapperElement = document.createElement('div');

  modalWrapperElement.innerHTML = message;
  body.appendChild(modalWrapperElement);


  modalInner = modalWrapperElement.querySelector('div[class*="inner"]');
  button = modalWrapperElement.querySelector(buttonSelector);

  addEventListeners(modalWrapperElement, modalInner);
};


const closeModal = (modalElement) => {
  modalElement.remove();
  removeEventListeners();
};

const onDocumentKeydown = (key, modalElement) => {
  if (isEscapeKey(key)) {
    closeModal(modalElement);
  }
};

const onModalInnerClick = (event) => event.stopPropagation();

function addEventListeners(modalWrapperElement, modalInnerElement) {
  onKeydownListener = (event) => onDocumentKeydown(event.key, modalWrapperElement);
  onBodyClickListener = () => closeModal(modalWrapperElement);
  onButtonClickListener = (event) => closeModal(modalWrapperElement, event);

  document.addEventListener('keydown', onKeydownListener);
  button.addEventListener('click', onBodyClickListener);
  body.addEventListener('click', onButtonClickListener);
  modalInnerElement.addEventListener('click', onModalInnerClick);
}

function removeEventListeners() {
  document.removeEventListener('keydown', onKeydownListener);
  button.removeEventListener('click', onButtonClickListener);
  body.removeEventListener('click', onBodyClickListener);
  modalInner.removeEventListener('click', onModalInnerClick);
}

export { showModal };
