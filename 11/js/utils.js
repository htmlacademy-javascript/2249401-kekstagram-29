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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getId = () => {
  let index = 0;
  return () => {
    index++;
    return index;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isAcceptKey = (evt) => evt.key === 'Enter' || evt.key === 'Space';

export { getRandomInteger, getUniqueInteger, getRandomArrayElement, getId, isEscapeKey, isAcceptKey };
