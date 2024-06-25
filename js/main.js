import { generatePhotos } from './mocks.js';
import { renderMiniature } from './miniature.js';
import { addEventListener } from './fullsize.js';

const photos = generatePhotos();
renderMiniature(photos);
addEventListener(photos);
