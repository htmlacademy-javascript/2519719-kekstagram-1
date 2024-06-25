import {
  bigPicture, bigPictureButtonCancel, bigPictureImg, bigPictureLikes, bigPictureComments, bigPictureDescription, bigPictureListComments, bigPictureSocialComment, miniaturePictures
} from './elements.js';

const renderComment = (photo) => {
  const fragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    const copycomment = bigPictureSocialComment.cloneNode(true);
    copycomment.querySelector('.social__text').textContent = '';
    copycomment.querySelector('.social__text').textContent = comment.message;
    copycomment.querySelector('.social__picture').src = comment.avatar;
    copycomment.querySelector('.social__picture').alt = comment.name;
    fragment.appendChild(copycomment);
  });
  bigPictureListComments.appendChild(fragment);
};

const openFullsizePhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;
  bigPictureComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;

  bigPictureListComments.innerHTML = '';

  renderComment(photo);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureButtonCancel.addEventListener('click', onbigPictureButtonCancelClick);

};

const addPicturesEventListener = (photos) => {

  miniaturePictures.addEventListener('click', (evt) => {

    evt.preventDefault();
    const picture = evt.target.closest('.picture');
    const pictureId = picture.id;

    if (picture) {
      const foundPhoto = photos.find((photo) => photo.id === Number(pictureId));
      openFullsizePhoto(foundPhoto);
    }
  });
};


const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureButtonCancel.removeEventListener('click', onbigPictureButtonCancelClick);
};

const closeFullsizePhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventListeners();
};


function onbigPictureButtonCancelClick(evt) {
  evt.preventDefault();
  closeFullsizePhoto();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeFullsizePhoto();
  }
}

export { openFullsizePhoto, addPicturesEventListener };


