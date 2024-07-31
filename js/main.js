import { renderMiniature } from './miniature.js';
import { addPicturesEventListener } from './fullsize-photo.js';
import { getPhotos } from './api.js';
import { showAlert } from './util.js';
import { setFormSubmit } from './form.js';
import { initFilters } from './filter.js';
import './scale.js';
import './effects.js';
import './file-chooser.js';

try {
  const photos = await getPhotos();
  renderMiniature(photos);
  addPicturesEventListener(photos);

  initFilters(photos);

} catch (err) {
  showAlert(err.message);
}

setFormSubmit();
