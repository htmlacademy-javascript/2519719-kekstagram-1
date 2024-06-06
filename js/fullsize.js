const bigPucrure = document.querySelector('.big-picture');
const buttoncancel = document.querySelector('.big-picture__cancel');

function fullsize (photo) {

  const srcBigPicture = document.querySelector('.big-picture__img img');
  const likes = document.querySelector('.likes-count');
  const comments = document.querySelector('.comments-count');
  const socialcomment = document.querySelector('.social__text');
  const description = document.querySelector('.social__caption');
  const listcomments = document.querySelector('.social__comments');
  const commentone = document.querySelector('.social__comment');

  bigPucrure.classList.remove('hidden');
  srcBigPicture.src = photo.url;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  description.textContent = photo.description;


  listcomments.innerHTML='';

  photo.comments.forEach((comment) => {


    const copycomment = commentone.cloneNode(true);
    copycomment.querySelector('.social__text').textContent = '';
    copycomment.querySelector('.social__text').textContent = comment.message;
    copycomment.querySelector('.social__picture').src = comment.avatar;
    copycomment.querySelector('.social__picture').alt = comment.name;
    listcomments.appendChild(copycomment);
  });

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  addListenerOnPhoto();


}

function addEventListeners(photos) {

  const pictureImgs = document.querySelectorAll('.picture__img');
  pictureImgs.forEach((pictureEl, index) => {
    pictureEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      fullsize(photos[index]);
    });
  });
}

function addListenerOnPhoto() {
  document.addEventListener('keydown', keydownListener);
  buttoncancel.addEventListener('click', closeModal);
}

function closeModal(evt) {
  evt.preventDefault();
  bigPucrure.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventListeners();
}

const keydownListener = (evt) => {
  if (evt.key === 'Escape') {
    closeModal(evt);
  }
};


const removeEventListeners = () => {
  document.removeEventListener('keydown', keydownListener);
  buttoncancel.removeEventListener('click', closeModal);
};
export {fullsize, addEventListeners};


