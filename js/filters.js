import {getRandomNumber} from './util.js';

const QUANTITY_DELETED_PHOTOS = 13;
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filtersImgList = document.querySelectorAll('.img-filters__button');

// Добавить модифицированный класс на активный фильтр
const addFilterClassActive = (currentFilter) => {
  filtersImgList.forEach((filter) => {
    filter.classList.remove('img-filters__button--active');
    currentFilter.classList.add('img-filters__button--active');
  });
};

// Очистка перед каждой фильтрацией ранее показанных фотографий
const clearPicturesContainer = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

// Обработчик клика на фильтр по умолчанию
const onFilterDefaultClick = (arrayPhotos, createPicture, imgClickHandler) => {
  filterDefault.addEventListener('click', () => {
    clearPicturesContainer();
    createPicture(arrayPhotos);
    imgClickHandler(arrayPhotos);
    addFilterClassActive(filterDefault);
  });
};

const onFilterRandomClick = (arrayPhotos, createPicture, imgClickHandler) => {
  filterRandom.addEventListener('click', () => {
    clearPicturesContainer();
    const copiedArray = arrayPhotos.slice();
    for (let i = 1; i <= QUANTITY_DELETED_PHOTOS; i++) {
      copiedArray.splice(getRandomNumber(0, copiedArray.length - 1), 1);
    }
    createPicture(copiedArray);
    imgClickHandler(copiedArray);
    addFilterClassActive(filterRandom);
  });
};

// Обработчик клика на фильтр с самыми обсуждаемыми фотографиями
const onFilterDiscussedClick = (arrayPhotos, createPicture, imgClickHandler) => {
  filterDiscussed.addEventListener('click', () => {
    clearPicturesContainer();
    const copiedArray = arrayPhotos.slice();
    copiedArray.sort((photoCommentsPrevious, photoCommentsNext) => photoCommentsNext.comments.length - photoCommentsPrevious.comments.length
    );
    createPicture(copiedArray);
    imgClickHandler(copiedArray);
    addFilterClassActive(filterDiscussed);
  });

};
export {onFilterDefaultClick, onFilterRandomClick, onFilterDiscussedClick};
