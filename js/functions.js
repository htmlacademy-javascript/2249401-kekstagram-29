const getStringLength = (inputString, maxLength) => inputString.length <= maxLength;

getStringLength('string', 5);

const isPalindrome = (palindrome) => {
  const string = palindrome.replaceAll(' ', '').toLowerCase();
  let ReversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    ReversedString += string[i];
  }
  return ReversedString === string;
};

isPalindrome('PizzaazziP');

const extractNumber = (value) => {
  const string = value.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

extractNumber('pizza123pizza');
