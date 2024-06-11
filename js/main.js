import {generatePhotos, createPhoto} from './mocks.js';
import { renderMiniature } from './miniature.js';
import {openFullsize} from './fullsize.js';
import { addEventListeners } from './fullsize.js';
const photos = generatePhotos();
const photo = createPhoto();
renderMiniature(photos)
addEventListeners(photos);

