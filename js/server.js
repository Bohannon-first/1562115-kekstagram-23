import {getClickPhotoItem} from './big-photo.js';
import {showAlert} from './util.js';

const urlGetData = 'https://23.javascript.pages.academy/kekstagram/data';
const urlSendData = 'https://23.javascript.pages.academy/kekstagram';
const imgFiltersContainer = document.querySelector('.img-filters');

// Получить данные
const getData = (onSuccess) => {
  fetch(urlGetData)

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      onSuccess(photos);
      getClickPhotoItem(photos);
      imgFiltersContainer.classList.remove('img-filters--inactive');
    })
    .catch((err) => showAlert(err));
};

// Отправить данные
const sendData = (onSuccess, onFail, body) => {
  fetch(
    urlSendData,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз.');
    });
};

export {getData, sendData};
