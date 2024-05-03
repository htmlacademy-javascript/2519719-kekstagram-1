
const isPalindrome = (str) => {
  let newString = '';
  newString = str.replaceAll(' ', '').toLowerCase();
  let length = newString.length / 2;
  if (length % 2 !== 0) {
    length = Math.floor(length);
  }
  for (let i = 0; i <= length; i = i + 1) {
    if (newString[i] !== newString[newString.length - i - 1]) {
      return false;
    }
  }
  return true;
};
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


const extractNumbers = (str) => {
  let result = '';
  for (let i = 0; i <= str.length; i = i + 1) {
    if(!isNaN(parseInt(str[i], 10))) {
      result += str[i];

    }
  }
  return parseInt(result, 10);
};

extractNumbers('2023 год');// 2023
extractNumbers('ECMAScript 2022');// 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007');// 7
extractNumbers('а я томат');// NaN


const padToLength = (firstString, number, secondString) => {
  if (firstString.length >= number) {
    return firstString;
  } else {
    let newString = firstString;
    while (newString.length < number) {
      newString = secondString.slice(0, number - newString.length) + newString;
    }
    return newString;
  }
};
padToLength('q', 4, 'we');

const checkStringLength = (str, number) => str.length <= number;
checkStringLength('проверяемая строка', 20);

