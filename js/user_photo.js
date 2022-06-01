import {listPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplateContent = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateContent.querySelector('a');

// Записал массив с объектами(временными данными) в переменную
const photosUsersList = listPhotos;

// Создал documentFragment
const photosUsersFragment = document.createDocumentFragment();

// Заполнил клонированный шаблон временными данными
photosUsersList.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  photosUsersFragment.appendChild(pictureElement);
});

// Вставил заполненный documentFragment в блок .pictures
picturesContainer.appendChild(photosUsersFragment);

export {photosUsersList};
