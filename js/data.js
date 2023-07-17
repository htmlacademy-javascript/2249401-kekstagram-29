import { getRandomInteger, getUniqueInteger, getRandomArrayElement, getId } from './utils.js';

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

const createCommentsVariety = () => ({
  id: getUniqueInteger(1, Math.round(Math.random() * 100))(),
  avatar: `img/avatar-${getUniqueInteger(1, 6)()}.svg`,
  message: getRandomArrayElement(COMMENTSMESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({ length: getRandomInteger(0, 30) }, createCommentsVariety);

// ВЫСТРАИВАНИЕ ОСНОВНОГО ОБЪЕКТА

const getPhotoID = getId();

const createObjects = () => {
  const createdObjects = [];

  for (let i = 0; i < 25; i++) {
    const id = getPhotoID();
    const url = `photos/${id}.jpg`;

    const newObject = {
      id: id,
      url: url,
      description: 'Это картинка в Кекстаграмме',
      likes: getUniqueInteger(15, 200)(),
      comments: createComments(),
    };

    createdObjects.push(newObject);
  }

  return createdObjects;
};

/*
const createObjects = () => {
  const createdObjects = [];

  for (let i = 0; i <= 25; i++) {
    const id = i + 1;
    const url = `photos/${i + 1}.jpg`;
  }

  const newObject = () => ({
    id: id,
    url: url,
    description: 'Это картинка в Кекстаграмме',
    likes: getUniqueInteger(15, 200)(),
    comments: createComments(),
  });

  createdObjects.push(newObject);

  return createdObjects;
};
 */

export { createObjects };
