import { pictures, template } from './elements.js';

const renderMiniature = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const puctire = template.cloneNode(true);
    const img = puctire.querySelector('.picture__img');
    const comments = puctire.querySelector('.picture__comments');
    const likes = puctire.querySelector('.picture__likes');
    puctire.setAttribute('id', photo.id);
    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;
    fragment.appendChild(puctire);

  });
  pictures.appendChild(fragment);
};


export { renderMiniature };
