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
let photo;

const renderComment = () => {
  bigPictureShowMoreComments.classList.remove('hidden');
  const commentsPerPage = 5;
  let endIndex = startIndex + commentsPerPage;

  const fragment = document.createDocumentFragment();

  if (endIndex >= photo.comments.length) {
    endIndex = photo.comments.length;
  }

  photo.comments.forEach((comment, index) => {
    const newCount = bigPictureCountComment.innerHTML.split(' ');
    newCount[0] = endIndex;
    const newCountString = newCount.join(' ');
    bigPictureCountComment.innerHTML = newCountString;
    if (index >= startIndex && index < endIndex) {
      const copycomment = bigPictureSocialComment.cloneNode(true);
      copycomment.querySelector('.social__text').textContent = '';
      copycomment.querySelector('.social__text').textContent = comment.message;
      copycomment.querySelector('.social__picture').src = comment.avatar;
      copycomment.querySelector('.social__picture').alt = comment.name;
      fragment.appendChild(copycomment);
    }
  });

  bigPictureListComments.appendChild(fragment);
  startIndex += commentsPerPage;

  if (endIndex >= photo.comments.length) {
    bigPictureShowMoreComments.classList.add('hidden');
  }

  document.querySelector('body').classList.add('modal-open');
};

const openFullsizePhoto = () => {
  const bigPictureComments = bigPicture.querySelector('.comments-count');

  bigPictureListComments.innerHTML = '';
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;

  bigPictureComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;


  bigPictureShowMoreComments.addEventListener('click', renderComment);
  renderComment();


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
      photo = foundPhoto;
      openFullsizePhoto(foundPhoto);
    }
  });
};


const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureButtonCancel.removeEventListener('click', onbigPictureButtonCancelClick);
  bigPictureShowMoreComments.removeEventListener('click', renderComment);
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


