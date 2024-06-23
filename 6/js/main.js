import {generatePhotos} from './mocks.js';
import { renderMiniature } from './miniature.js';
import { addEventListeners } from './fullsize.js';
const photos = generatePhotos();
renderMiniature(photos);
addEventListeners(photos);

