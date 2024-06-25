import { miniaturePictures, miniatureTemplate } from './elements.js';

const renderMiniature = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const puctire = miniatureTemplate.cloneNode(true);
    const img = puctire.querySelector('.picture__img');
    const bigPictureComments = puctire.querySelector('.picture__comments');
    const likes = puctire.querySelector('.picture__likes');
    puctire.id = photo.id;
    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    bigPictureComments.textContent = photo.comments.length;
    fragment.appendChild(puctire);

  });
  miniaturePictures.appendChild(fragment);
};


export { renderMiniature };
