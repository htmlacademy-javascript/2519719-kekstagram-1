import {
  bigPicture,
  bigPictureButtonCancel,
  bigPictureImg,
  bigPictureLikes,
  bigPictureComments,
  bigPictureDescription,
  bigPictureListComments,
  bigPictureSocialComment,
  miniaturePictures,
  bigPictureShowMoreComments,
  bigPictureCountComment
} from './elements.js';


let startIndex = 0;

const onBigPictureShowMoreButtonClick = (photo) => {
  return () => renderComment(photo)
}

const renderComment = (photo) => {
  bigPictureShowMoreComments.classList.remove('hidden');
  const commentsPerPage = 5;
  let endIndex = startIndex + commentsPerPage;

  const fragment = document.createDocumentFragment();

  photo.comments.forEach((comment, index) => {
    if (endIndex > photo.comments.length) {
      endIndex = photo.comments.length;
    }

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
  })

  bigPictureListComments.appendChild(fragment);
  startIndex += commentsPerPage;

  if (endIndex >= photo.comments.length) {
    bigPictureShowMoreComments.classList.add('hidden');
  }

  document.querySelector('body').classList.add('modal-open');
}

const openFullsizePhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;
  bigPictureComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;

  bigPictureListComments.innerHTML = '';

  bigPictureShowMoreComments.addEventListener('click', onBigPictureShowMoreButtonClick(photo));
  renderComment(photo);


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
  bigPictureShowMoreComments.removeEventListener('click', onBigPictureShowMoreButtonClick);
};

const closeFullsizePhoto = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventListeners();
  startIndex = 0
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


