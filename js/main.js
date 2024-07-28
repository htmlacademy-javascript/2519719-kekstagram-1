import { renderMiniature } from './miniature.js';
import { addPicturesEventListener } from './fullsize-photo.js';
import { getPhotos } from './api.js';
import { showAlert } from './modal.js';
import { setFormSubmit } from './form.js';
import { addEventListenerOnRandomFilterClick, addEventListenerOnDiscussedFilterClick, addEventListenerOnDefaultFilterClick } from './filter.js';
import './form.js';
import './filter.js';
import './scale.js';
import './effects.js';
import './modal.js';
import './api.js';

try {
  const photos = await getPhotos();
  renderMiniature(photos);
  addPicturesEventListener(photos);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  addEventListenerOnRandomFilterClick(photos);
  addEventListenerOnDiscussedFilterClick(photos);
  addEventListenerOnDefaultFilterClick(photos);

} catch (err) {
  showAlert(err.message);
}

setFormSubmit();
