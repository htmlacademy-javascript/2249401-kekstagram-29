import { getRandomInteger, getUniqueInteger, getRandomArrayElement } from './utils.js';

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

const createObjects = () => {
  const createdObjects = [];

  const createObject = () => {
    const id = getUniqueInteger(1, 25)();
    const url = `photos/${getUniqueInteger(1, 25)()}.jpg`;

    // Проверяем, чтобы id и url были уникальными
    if (createdObjects.some((obj) => obj.id === id) || createdObjects.some((obj) => obj.url === url)) {
      return createObject(); // Если не уникально, вызываем функцию заново
    }

    const newObject = {
      id: id,
      url: url,
      description: 'Это картинка в Кекстаграмме',
      likes: getUniqueInteger(15, 200)(),
      comments: createComments(),
    };

    createdObjects.push(newObject);

    return newObject;
  };

  return Array.from({ length: 25 }, createObject);
};
export {createObjects};
