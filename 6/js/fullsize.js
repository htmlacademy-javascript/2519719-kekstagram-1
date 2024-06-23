const bigPucture = document.querySelector('.big-picture');
const buttonCancel = document.querySelector('.big-picture__cancel');

function openFullsize (photo) {

  const srcBigPicture = document.querySelector('.big-picture__img img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');
  const description = document.querySelector('.social__caption');
  const listComments = document.querySelector('.social__comments');
  const commentOne = document.querySelector('.social__comment');

  bigPucture.classList.remove('hidden');
  srcBigPicture.src = photo.url;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  description.textContent = photo.description;


  listComments.innerHTML='';

  function addListenersOnPhoto() {
    document.addEventListener('keydown', onDocumentKeydown);
    buttonCancel.addEventListener('click', onButtonCancelClick);
  }

  photo.comments.forEach((comment) => {


    const copycomment = commentOne.cloneNode(true);
    copycomment.querySelector('.social__text').textContent = '';
    copycomment.querySelector('.social__text').textContent = comment.message;
    copycomment.querySelector('.social__picture').src = comment.avatar;
    copycomment.querySelector('.social__picture').alt = comment.name;
    listComments.appendChild(copycomment);
  });

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  addListenersOnPhoto();


}

function addEventListeners(photos) {

  const pictureImgs = document.querySelectorAll('.picture__img');
  pictureImgs.forEach((pictureEl, index) => {
    pictureEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullsize(photos[index]);
    });
  });
}


function onButtonCancelClick(evt) {
  evt.preventDefault();
  bigPucture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventListeners();
}

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    onButtonCancelClick(evt);
  }
};


const removeEventListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonCancel.removeEventListener('click', onButtonCancelClick);
};
export {openFullsize, addEventListeners};


