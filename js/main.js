const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Белочка1999',
  'Елисей',
  'Мария Викторовна',
  'Анонимный аноним',
  'Света',
  'Алина',
  'Володя'
];
const DESCRIPTIONS = [
  'Фоточка, а на ней красоточка',
  'Это я на даче, сейчас дома уже',
  'Подумать дважды? Прости, я не думаю даже единожды',
  'Ну и кто кому теперь не пара, Володенька?'
];

const PHOTO_COUNT = 25;


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const like = {
  MIN: 15,
  MAX: 200
};

const minAvatarInt = 1;
const maxAvatarInt = 6;
const minId = 1;
const maxCommentId = 1000000000000;
const minCommentValue = 1;
const maxCommentValue = 10;


const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const generateCommentId = createRandomIdFromRangeGenerator(minId, maxCommentId);
const generatePhotoId = createRandomIdFromRangeGenerator(minId, PHOTO_COUNT);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `avatar-${getRandomInteger(minAvatarInt, maxAvatarInt)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPhoto = () => {
  const id = generatePhotoId();
  const comments = Array.from({length: getRandomInteger(minCommentValue, maxCommentValue)}, createComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(like.MIN, like.MAX),
    comments : comments,
  };
};

const generatePhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);
generatePhotos();

