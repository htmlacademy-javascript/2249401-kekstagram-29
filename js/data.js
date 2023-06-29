import { getRandomInteger, getUniqueInteger, getRandomArrayElement } from '.util/js';
// настройка комментария

const COMMENTSMESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван',
  'Игорь',
  'Ольга',
  'Олег',
  'Владимир',
  'Анна',
  'Анастасия',
  'Ярослав',
];

// ВЫСТРАИВАНИЕ КОММЕНТАРИЯ

const commentsVariety = () => ({
  id: getUniqueInteger(1, Math.round(Math.random() * 100))(),
  avatar: `img/avatar-${getUniqueInteger(1, 6)()}.svg`,
  message: getRandomArrayElement(COMMENTSMESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({ length: getRandomInteger(0, 30) }, commentsVariety);

// ВЫСТРАИВАНИЕ ОСНОВНОГО ОБЪЕКТА

const createObject = () => ({
  id: getUniqueInteger(1, 25)(),
  url: `photos/${getUniqueInteger(1, 25)()}.jpg`,
  description: 'Это картинка в Кекстаграмме',
  likes: getUniqueInteger(15, 200)(),
  comments: createComments(),
});

export {createObject};
