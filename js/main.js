import { renderMiniature } from './miniature.js';
import { addPicturesEventListener } from './fullsize-photo.js';
import { getPhotos } from './server-data.js';
import './form.js';
import './scale.js';
import './effects.js';

const photos = await getPhotos();
renderMiniature(photos);
renderMiniature(photos);
addPicturesEventListener(photos);
