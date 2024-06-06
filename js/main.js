import {generatePhotos} from './mocks.js';
import { renderMiniature } from './miniature.js';
import {fullsize} from './fullsize.js';
import { addEventListeners } from './fullsize.js';
const photos = generatePhotos();
renderMiniature(photos);
addEventListeners(photos);
// const photo = createPhoto();

