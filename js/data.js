import {getRandomNumber} from './util.js';

// Количество необходимых объектов для генерации
const QUANTITY_DESCRIPTIONS_PHOTOS = 25;

// Список описаний фотографий
const DESCRIPTIONS = [
  'Описание 1-й фотографии',
  'Описание 2-й фотографии',
  'Описание 3-й фотографии',
  'Описание 4-й фотографии',
  'Описание 5-й фотографии',
  'Описание 6-й фотографии',
  'Описание 7-й фотографии',
  'Описание 8-й фотографии',
  'Описание 9-й фотографии',
  'Описание 11-й фотографии',
  'Описание 10-й фотографии',
  'Описание 12-й фотографии',
  'Описание 13-й фотографии',
  'Описание 14-й фотографии',
  'Описание 15-й фотографии',
  'Описание 16-й фотографии',
  'Описание 17-й фотографии',
  'Описание 18-й фотографии',
  'Описание 19-й фотографии',
  'Описание 20-й фотографии',
  'Описание 21-й фотографии',
  'Описание 22-й фотографии',
  'Описание 23-й фотографии',
  'Описание 24-й фотографии',
  'Описание 25-й фотографии',
];

// Количество лайков
const LIKES = {
  MIN: 15,
  MAX: 200,
};

// Описание ключей объекта с комментарием
// Идентификатор комментария
const ID_COMMENT = {
  MIN: 1,
  MAX: 1000,
};

// Количество аватарок пользователей
const AVATARS = {
  MIN: 1,
  MAX: 6,
};

// Список комментариев к фотографиям
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Список имен комментаторов фотографий
const NAMES = [
  'Ярослав',
  'Олег',
  'Николай',
  'Татьяна',
  'Екатерина',
  'Ксения',
  'Лёха',
  'Глеб',
  'Юля',
  'Александр',
  'Макс',
  'Павел',
  'Валера',
  'Юрий',
  'Дмитрий',
  'Миша',
  'Руслан',
  'Наташа',
  'Настя',
  'Мария',
  'Сергей',
  'Григорий',
  'Роман',
  'Эрнест',
  'Гурген',
];

// Массив идентификаторов описания
const arrayId = [];

// Счётчик заполнения пустого массива идентификаторами описаний
for (let idItemCounter = 1; idItemCounter <= QUANTITY_DESCRIPTIONS_PHOTOS; idItemCounter++) {
  arrayId.push(idItemCounter);
}

// Массив с картинками
const arrayPhotos = [];

// Счётчик заполнения пустого массива картинками
for (let photoItemCounter = 1; photoItemCounter <= QUANTITY_DESCRIPTIONS_PHOTOS; photoItemCounter++) {
  arrayPhotos.push(`photos/${photoItemCounter}.jpg`);
}

// Массив ID комментариев к фотографиям
const arrayIdComments = [];

// Счётчик заполнения пустого массива ID комментариев к фоткам
for (let idItemCounter = ID_COMMENT.MIN; idItemCounter <= ID_COMMENT.MAX; idItemCounter++) {
  arrayIdComments.push(idItemCounter);
}

// Массив аватаров
const arrayAvatars = [];

// Счётчик заполнения массива аватаров
for (let avatarItemCounter = AVATARS.MIN; avatarItemCounter <= AVATARS.MAX; avatarItemCounter++) {
  arrayAvatars.push(`img/avatar-${avatarItemCounter}.svg`);
}

// Вырезание/удаление случайного элемента из заполненного массива
const cutRandomElementArray = function (someArray) {
  return someArray.splice(getRandomNumber(0, someArray.length - 1), 1);
};

// Получение рандомного элемента из массива
const getRandomElementArray = function (someArray) {
  return someArray[getRandomNumber(0, someArray.length - 1)];
};

// Функция генерации комментариев к фотографиям
const createComments = function () {
  return {
    id: `${cutRandomElementArray(arrayIdComments)}`,
    avatar: `${getRandomElementArray(arrayAvatars)}`,
    message: `${getRandomElementArray(MESSAGES)}`,
    name: `${getRandomElementArray(NAMES)}`,
  };
};

// Массив с комментариями к фотке
const arrayComments = [];

// Функция получения списка комментариев к фотке
const getListComments = function () {
  const numberComments = getRandomNumber(AVATARS.MIN, AVATARS.MAX);

  for (let comment = 1; comment <= numberComments; comment++) {
    arrayComments.push(createComments());
  }

  return arrayComments.splice(0);
};

// Функция генерации объектов
const createPhotos = function () {
  return {
    id: `${cutRandomElementArray(arrayId)}`,
    url: `${cutRandomElementArray(arrayPhotos)}`,
    description: `${cutRandomElementArray(DESCRIPTIONS)}`,
    likes: `${getRandomNumber(LIKES.MIN, LIKES.MAX)}`,
    comments: getListComments(),
  };
};

const listPhotos = new Array(QUANTITY_DESCRIPTIONS_PHOTOS).fill(null).map(() => createPhotos());

export {listPhotos};
