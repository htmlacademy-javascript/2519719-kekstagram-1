const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const MESSAGE = [
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
const PHOTO_COUNT = 25;
// const randomMessageIndex = getRandomInteger(0, MESSAGE.length - 1);
// const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const createRandom1from25 = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 1000000000000);
const createRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);


const createphoto = () => ({
  id: createRandomPhotoId(),
  url: `photos/${createRandom1from25()}.jpg`,
  description: 'Фоточка, а на ней красоточка',
  likes: getRandomInteger(15, 200),
  comments : [{
    id: generateCommentId(),
    avatar: `avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  }],
});

const simularPhoto = Array.from({length: PHOTO_COUNT}, createphoto);
console.log(simularPhoto);

