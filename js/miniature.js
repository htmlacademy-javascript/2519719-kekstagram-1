import { miniaturePictures, miniatureTemplate } from './elements.js';

const renderMiniature = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picture = miniatureTemplate.cloneNode(true);
    const img = picture.querySelector('.picture__img');
    const bigPictureComments = picture.querySelector('.picture__comments');
    const likes = picture.querySelector('.picture__likes');
    picture.id = photo.id;
    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    bigPictureComments.textContent = photo.comments.length;
    fragment.appendChild(picture);

  });
  miniaturePictures.appendChild(fragment);
};

const deleteMiniatures = () => {
  const miniatures = document.querySelectorAll('.picture');
  miniatures.forEach((miniature) => miniature.remove());
};

export { renderMiniature, deleteMiniatures };
