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
  bigPictureCountComment
} from './elements.js';


let startIndex = 0;
let photoComments;
const COMMENTSPERPAGE = 5;

const bigPictureComments = bigPicture.querySelector('.comments-count');

const renderComment = (comment, index, endIndex, fragment) => {
  const newCount = bigPictureCountComment.querySelector('.first-comments-count');
  newCount.textContent = endIndex;
  if (index >= startIndex && index < endIndex) {
    const newComment = bigPictureSocialComment.cloneNode(true);
    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    fragment.appendChild(newComment);
  }
};

const renderComments = () => {
  bigPictureShowMoreComments.classList.remove('hidden');

  let endIndex = startIndex + COMMENTSPERPAGE;
  const fragment = document.createDocumentFragment();

  if (endIndex >= photoComments.length) {
    endIndex = photoComments.length;
  }

  photoComments.forEach((comment, index) => renderComment(comment, index, endIndex, fragment));

  bigPictureListComments.appendChild(fragment);
  startIndex += COMMENTSPERPAGE;

  if (endIndex >= photoComments.length) {
    bigPictureShowMoreComments.classList.add('hidden');
  }

};

const openFullsizePhoto = (photo) => {
  bigPictureListComments.innerHTML = '';
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;

  bigPictureComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;


  bigPictureShowMoreComments.addEventListener('click', renderComments);
  renderComments();


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
      const foundPhoto = photos.find((photoItem) => photoItem.id === Number(pictureId));
      photoComments = foundPhoto.comments;
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
  startIndex = 0;
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


