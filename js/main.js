import { generatePhotos } from './mocks.js';
import { renderMiniature } from './miniature.js';
import { addPicturesEventListener } from './fullsize.js';

const photos = generatePhotos();
renderMiniature(photos);
addPicturesEventListener(photos);
