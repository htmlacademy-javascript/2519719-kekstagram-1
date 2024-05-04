import {MESSAGES, NAMES, DESCRIPTIONS, PHOTO_COUNT, Like, MINAVATARINT, MAXAVATARINT, MINID,
  MAXCOMMENTID, MINCOMMENTVALUE, MAXCOMMENTVALUE} from './data.js';
import {createRandomIdFromRangeGenerator, getRandomArrayElement, getRandomInteger} from './util.js';

const generateCommentId = createRandomIdFromRangeGenerator(MINID, MAXCOMMENTID);
const generatePhotoId = createRandomIdFromRangeGenerator(MINID, PHOTO_COUNT);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `avatar-${getRandomInteger(MINAVATARINT, MAXAVATARINT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPhoto = () => {
  const id = generatePhotoId();
  const comments = Array.from({length: getRandomInteger(MINCOMMENTVALUE, MAXCOMMENTVALUE)}, createComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(Like.MIN, Like.MAX),
    comments : comments,
  };
};

const generatePhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);
generatePhotos();
