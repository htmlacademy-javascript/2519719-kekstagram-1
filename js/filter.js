import { renderMiniature } from './miniature.js';
import { buttonFilterRandom, buttonFilterDiscussed, buttonFilterDefault } from './elements.js';
import { debounce } from './util.js';

const RANDOM_PHOTO_COUNT = 10;

const debounceRenderMiniature = debounce((photos) => renderMiniature(photos));

const deleteMiniatures = () => {
  const miniatures = document.querySelectorAll('.picture');
  miniatures.forEach((miniature) => miniature.remove());
};

const getRandomPhotos = (photos) => {

  const randomPhotosForRender = [];
  while (randomPhotosForRender.length < RANDOM_PHOTO_COUNT) {
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    const foundPhoto = randomPhotosForRender.find((findPhoto) => findPhoto.id === randomPhoto.id);
    if (!foundPhoto) {
      randomPhotosForRender.push(randomPhoto);
    }
  }
  return randomPhotosForRender;
};
const addEventListenerOnRandomFilterClick = (photos) => {
  buttonFilterRandom.addEventListener('click', () => {
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.add('img-filters__button--active');
    deleteMiniatures();
    const randomPhotosRender = getRandomPhotos(photos);
    debounceRenderMiniature(randomPhotosRender);
  });
};

const getDiscussedPhotos = (photos) => {
  const sortedPhoto = [...photos];
  return sortedPhoto.sort((a, b) => b.comments.length - a.comments.length);
};

const addEventListenerOnDiscussedFilterClick = (photos) => {
  buttonFilterDiscussed.addEventListener('click', () => {
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.add('img-filters__button--active');
    deleteMiniatures();
    const discussedPhotoRender = getDiscussedPhotos(photos);
    debounceRenderMiniature(discussedPhotoRender);
  });
};

const addEventListenerOnDefaultFilterClick = (photos) => {
  buttonFilterDefault.addEventListener('click', () => {
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    buttonFilterDefault.classList.add('img-filters__button--active');
    deleteMiniatures();
    debounceRenderMiniature(photos);
  });
};


const initFilters = (photos) => {

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  addEventListenerOnRandomFilterClick(photos);
  addEventListenerOnDiscussedFilterClick(photos);
  addEventListenerOnDefaultFilterClick(photos);

};
export { initFilters };
