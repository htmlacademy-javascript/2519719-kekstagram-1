import {
  bigPicture,
  bigPictureButtonCancel,
  bigPictureImg,
  bigPictureLikes,
  bigPictureDescription,
  bigPictureListComments,
  bigPictureSocialComment,
  miniaturePictures,
  bigPictureShowMoreComments,
  bigPictureComments,
  shownCommentCount
} from './elements.js';

import { isEscapeKey } from './util.js';

const COMMENTS_PER_PAGE = 5;

let startIndex = 0;
let photoComments;

const getComment = (comment) => {
  const newComment = bigPictureSocialComment.cloneNode(true);
  newComment.querySelector('.social__text').textContent = comment.message;
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  return newComment;
};

const renderComments = () => {
  bigPictureShowMoreComments.classList.remove('hidden');

  let endIndex = startIndex + COMMENTS_PER_PAGE;

  const fragment = document.createDocumentFragment();


  if (endIndex >= photoComments.length) {
    endIndex = photoComments.length;
  }

  for (let i = startIndex; i < endIndex; i++) {
    fragment.appendChild(getComment(photoComments[i]));
    shownCommentCount.textContent = endIndex;
  }
  startIndex += COMMENTS_PER_PAGE;

  if (endIndex >= photoComments.length) {
    bigPictureShowMoreComments.classList.add('hidden');
  }
  bigPictureListComments.appendChild(fragment);

};


const openFullsizePhoto = (photo) => {
  bigPictureListComments.innerHTML = '';
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;

  bigPictureComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;

  renderComments();

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureButtonCancel.addEventListener('click', onBigPictureButtonCancelClick);
};

const addPicturesEventListener = (photos) => {
  miniaturePictures.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');

    if (picture) {
      const pictureId = picture.id;
      const foundPhoto = photos.find((photoItem) => photoItem.id === Number(pictureId));
      photoComments = foundPhoto.comments;
      openFullsizePhoto(foundPhoto);
    }
  });
};

const onBigPictureShowMoreCommentsClick = () => {
  renderComments();
};

bigPictureShowMoreComments.addEventListener('click', onBigPictureShowMoreCommentsClick);

const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureButtonCancel.removeEventListener('click', onBigPictureButtonCancelClick);
};

const closeFullsizePhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventListeners();
  startIndex = 0;
};


function onBigPictureButtonCancelClick(evt) {
  evt.preventDefault();
  closeFullsizePhoto();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeFullsizePhoto();
  }
}


export { openFullsizePhoto, addPicturesEventListener };


