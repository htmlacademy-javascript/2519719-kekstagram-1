import {MESSAGES, NAMES, DESCRIPTIONS, PHOTO_COUNT, Like, MIN_AVATAR, MAX_AVATAR, MIN_ID,
  MAX_COMMENT_ID, MIN_COMMENT_VALUE, MAX_COMMENT_VALUE} from './data.js';
import {createRandomIdFromRangeGenerator, getRandomArrayElement, getRandomInteger} from './util.js';

const generateCommentId = createRandomIdFromRangeGenerator(MIN_ID, MAX_COMMENT_ID);
const generatePhotoId = createRandomIdFromRangeGenerator(MIN_ID, PHOTO_COUNT);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPhoto = () => {
  const id = generatePhotoId();
  const comments = Array.from({length: getRandomInteger(MIN_COMMENT_VALUE, MAX_COMMENT_VALUE)}, createComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(Like.MIN, Like.MAX),
    comments : comments,
  };
};

const generatePhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {generatePhotos};
