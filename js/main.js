import { generatePhotos } from './mocks.js';
import { renderMiniature } from './miniature.js';
import { addPicturesEventListener } from './fullsize-photo.js';
import './form.js';
import './scale.js';
import './effects.js';

const photos = generatePhotos();
renderMiniature(photos);
addPicturesEventListener(photos);
