/* {
id,
url,
description,
likes,
comments,
}
 */

// функция получения рандомного числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueInteger = (min, max) => {
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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const commentsVariety = () => ({
  id: getUniqueInteger(1, Math.round(Math.random() * 100))(),
  avatar: `img/avatar-${getUniqueInteger(1, 6)()}.svg`,
  message: getRandomArrayElement(COMMENTSMESSAGE),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({length: getRandomInteger(0, 30) }, commentsVariety);

// ВЫСТРАИВАНИЕ ОСНОВНОГО ОБЪЕКТА

const createObject = () => ({
  id: getUniqueInteger(1, 25)(),
  url: `photos/${getUniqueInteger(1, 25)()}.jpg`,
  description: 'Это картинка в Кекстаграмме',
  likes: getUniqueInteger(15, 200)(),
  comments: createComments(),
});

const object = Array.from({length: 25}, createObject);
