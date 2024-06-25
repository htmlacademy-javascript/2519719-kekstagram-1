import {
  bigPicture, buttonCancel, srcBigPicture, likes, comments, description, listComments, socialComment, pictures
} from './elements.js';

const openFullsizePhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  srcBigPicture.src = photo.url;
  srcBigPicture.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  description.textContent = photo.description;

  listComments.innerHTML = '';


  photo.comments.forEach((comment) => {
    const copycomment = socialComment.cloneNode(true);
    copycomment.querySelector('.social__text').textContent = '';
    copycomment.querySelector('.social__text').textContent = comment.message;
    copycomment.querySelector('.social__picture').src = comment.avatar;
    copycomment.querySelector('.social__picture').alt = comment.name;
    listComments.appendChild(copycomment);
  });

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  buttonCancel.addEventListener('click', onButtonCancelClick);

};

const addEventListener = (photos) => {
  // const pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', (evt) => {

    evt.preventDefault();
    const picture = evt.target.closest('.picture');
    const pictureId = picture.getAttribute('id');

    if (picture) {
      const foundPhoto = photos.find((photo) => photo.id === Number(pictureId));
      openFullsizePhoto(foundPhoto);
    }
  });
};


const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonCancel.removeEventListener('click', onButtonCancelClick);
};

const closeFullsizePhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventListeners();
};


function onButtonCancelClick(evt) {
  evt.preventDefault();
  closeFullsizePhoto();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeFullsizePhoto();
  }
}

export { openFullsizePhoto, addEventListener };


