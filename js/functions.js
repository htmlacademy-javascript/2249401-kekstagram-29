const getStringLength = (inputString, maxLength) => inputString.length <= maxLength;

getStringLength('string', 5);

/* const isPalindrome = (palindrome) => {
  const string = palindrome.replaceAll(' ', '').toLowerCase();
  let ReversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    ReversedString += string[i];
  }
  return ReversedString === string;
}; */

// далее оптимизирую решение

const isPalindrome = (palindrome) => {
  const string = palindrome.replaceAll(' ', '').toLowerCase();
  const reversed = string.split('').reverse().join(''); //split превращает строку в массив, reverse разворачивает элементы, join возвращает строку
  return string === reversed;
};

isPalindrome('PizzaazziP');

/* const extractNumber = (value) => {
  const string = value.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}; */

// используя [индексы]

/* const extractNumber = (value) => {
  const string = value.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      result += string[i];
    }
  }
  return parseInt(result, 10)
} */

// пробую с выражениями

// const extractNumber = (value) => {
//   const string = value.replace(/D/g, '');
//   return string === '' ? NaN : parseInt(string, 10);
// };

// с фильтром коллбэк

const extractNumber = (value) => {
  const nums = value.toString().split('').filter((char) => char >= '0' && char <= '9').join(''); // все равно, что .filter( function (char) {F})
  return nums ? nums : NaN;
};

extractNumber('pizza123pizza');
