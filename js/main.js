// Получение рандомного числа из диапазона
const getRandomNumber = (minNum, maxNum, lengthNum = 0) => {
  if (minNum < 0) {
    return 'Ошибка. Вы ввели отрицательное число. Число должно быть положительное.';
  }
  else if (maxNum <= minNum) {
    return 'Ошибка. Конечное число меньше или равно начальному.';
  }
  else if (minNum >= maxNum) {
    return 'Ошибка. Начальное число не должно быть больше или равно конечному.';
  }
  else {
    const randomNumber = minNum + Math.random() * (maxNum - minNum);
    return +randomNumber.toFixed(lengthNum);
  }
};
getRandomNumber();

// Проверка длины строки
const checkLengthString = (string, maxLength) => {
  if(string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

checkLengthString();

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength();
