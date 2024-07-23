import { renderMiniature } from './miniature.js';
import { addPicturesEventListener } from './fullsize-photo.js';
import { getPhotos } from './api.js';
import { showModal } from './messages.js';
import './form.js';
import './scale.js';
import './effects.js';
import './messages.js';
import './api.js';

const photos = await getPhotos(() => showModal('#global-error', '.error__button'));
renderMiniature(photos);
renderMiniature(photos);
addPicturesEventListener(photos);
