import {picturesContainer} from './user-photo.js';
import {isEscEvent} from './util.js';
import {resetFilterValues, isOriginalEffect, sliderElement, createSlider, elementEffectNone} from './slider.js';
import {sendData} from './server.js';
import {showPopupSuccess, showPopupError} from './popup.js';

const MAX_LENGHT_HASHTAG = 20;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_LENGTH_TEXT_DESCRIPTION = 140;

// Управлением масштабом фотографии
const SCALE_CONTROL = {
  MIN: 25,
  MIDDLE: 50,
  HIGH: 75,
  MAX: 100,
  STEP: 25,
};

// Переменные загрузки и валидации полей ввода
const uploadImgInput = document.querySelector('#upload-file');
const uploadImgForm = picturesContainer.querySelector('.img-upload__overlay');
const uploadBtnClose = uploadImgForm.querySelector('#upload-cancel');
const inputHashtag = uploadImgForm.querySelector('.text__hashtags');
const inputDescription = uploadImgForm.querySelector('.text__description');

// Переменные для редактирования изображения
const btnSmallerScale = uploadImgForm.querySelector('.scale__control--smaller');
const btnBiggerScale = uploadImgForm.querySelector('.scale__control--bigger');
const valueScaleInput = uploadImgForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadImgForm.querySelector('.img-upload__preview img');
const radioEffectsItems = document.querySelectorAll('.effects__radio');

// Обработчик отправки формы
const imgUploadForm = picturesContainer.querySelector('.img-upload__form');

// Шаблон регулярного выражения
const templateHashtagCommon = /(^#[A-Za-zА-ЯЁа-яё0-9]{0,}$)s*/;

// Функция уменьшения/увеличения масштаба фотографии
const setScale = (value) => {
  if (value === SCALE_CONTROL.MIN) {
    imgUploadPreview.style.transform = 'scale(0.25)';
  } else if (value === SCALE_CONTROL.MIDDLE) {
    imgUploadPreview.style.transform = 'scale(0.50)';
  } else if (value === SCALE_CONTROL.HIGH) {
    imgUploadPreview.style.transform = 'scale(0.75)';
  } else if (value === SCALE_CONTROL.MAX){
    imgUploadPreview.style.transform = 'scale(1)';
  }
};

// Обработчик клика уменьшения масштаба фотографии
const onBtnSmallerScaleClick = () => {
  const currentValue = Number(valueScaleInput.getAttribute('value').replace('%', ''));
  let valueMin = '';
  if (currentValue <= SCALE_CONTROL.MAX && currentValue > SCALE_CONTROL.MIN) {
    valueMin = currentValue - SCALE_CONTROL.STEP;
    valueScaleInput.setAttribute('value', `${valueMin}%`);
    setScale(valueMin);
  }
};

// Обработчик клика увеличения масштаба фотографии
const onBtnBiggerScaleClick = () => {
  const currentValue = Number(valueScaleInput.getAttribute('value').replace('%', ''));
  let valueMax = '';
  if (currentValue >= SCALE_CONTROL.MIN && currentValue < SCALE_CONTROL.MAX) {
    valueMax = currentValue + SCALE_CONTROL.STEP;
    valueScaleInput.setAttribute('value', `${valueMax}%`);
    setScale(valueMax);
  }
};

// Проверка на нажатую кнопку Esc и закрытие формы редактирования
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    const inputInFocus = document.activeElement;

    // Если поля ввода в фокусе - форма не закрывается на Esc
    if (inputInFocus === inputHashtag || inputInFocus === inputDescription) {
      return;
    }
    closeFormEditingImg();
  }
};

// Функция открытия формы
const openFormEditingImg = () => {
  uploadImgForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  valueScaleInput.setAttribute('value', '100%');
  elementEffectNone.checked = true;
  createSlider();
  isOriginalEffect();

  // Добавление обработчиков в момент открытия формы
  document.addEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.addEventListener('click', onBtnSmallerScaleClick);
  btnBiggerScale.addEventListener('click', onBtnBiggerScaleClick);
  uploadBtnClose.addEventListener('click', closeFormEditingImg);
};

// Удаление у всех фильтров атрибута checked
const removeEffect = () => {
  radioEffectsItems.forEach((effect) => {
    effect.removeAttribute('checked');
  });
};

// Функция закрытия формы
function closeFormEditingImg () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearFormEditing();
  resetFilterValues();
  removeEffect();

  // Удаление обработчиков после закрытия формы
  document.removeEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.removeEventListener('click', onBtnSmallerScaleClick);
  btnBiggerScale.removeEventListener('click', onBtnBiggerScaleClick);
  uploadBtnClose.removeEventListener('click', closeFormEditingImg);
}

// Закрытие формы в случае ошибки загрузки данных
function closeFormEditingImgError () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadImgInput.value = '';
}

uploadImgInput.addEventListener('change', openFormEditingImg);

// Сброс значения поля выбора файла формы редактирования после ее закрытия
function clearFormEditing () {
  uploadImgInput.value = '';
  inputHashtag.value = '';
  inputDescription.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
  // Уничтожить слайдер
  sliderElement.noUiSlider.destroy();
}

// Функция валидации хэш-тегов
const onHashTagInputValid = () => {
  const currentValue = inputHashtag.value;
  const arrayHashtags = currentValue.toLowerCase().split(' ');
  const uniqueHashtagArray = new Set(arrayHashtags);

  arrayHashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#') {
      inputHashtag.setCustomValidity('Хэш-тег должен начинаться с символа #');
    } else if (hashtag === '#') {
      inputHashtag.setCustomValidity('Хэш-тег не может состоять только из одной #');
    } else if (!templateHashtagCommon.test(hashtag)) {
      inputHashtag.setCustomValidity('Удалите спецсимволы. После решётки должны быть только буквы и цифры');
    } else if (hashtag.length > MAX_LENGHT_HASHTAG) {
      inputHashtag.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку. Удалите лишние ${hashtag.length - MAX_LENGHT_HASHTAG} симв.`);
    } else if (arrayHashtags.length > MAX_HASHTAG_NUMBERS) {
      inputHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else if (arrayHashtags.length !== uniqueHashtagArray.size) {
      inputHashtag.setCustomValidity('Хэш-теги не должны повторяться');
    } else {
      inputHashtag.setCustomValidity('');
    }

    inputHashtag.reportValidity();
  });
};

// Обработчик поля ввода хэш-тегов
inputHashtag.addEventListener('input', onHashTagInputValid);

// Функция проверки длины поля комментария
const onInputDescriptionValid = () => {
  const currentLengthComment = inputDescription.value.length;

  if (currentLengthComment > MAX_LENGTH_TEXT_DESCRIPTION) {
    inputDescription.setCustomValidity(`Длина комментария не может составлять больше 140 символов. Удалите лишние ${currentLengthComment - MAX_LENGTH_TEXT_DESCRIPTION} симв.`);
  } else {
    inputDescription.setCustomValidity('');
  }

  inputDescription.reportValidity();
};

inputDescription.addEventListener('input', onInputDescriptionValid);

// Обработчик отправки данных на форму
const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onSuccess();
        showPopupSuccess();
      },
      () => {
        onSuccess();
        showPopupError();
      },
      new FormData(evt.target),
    );
  });
};

export {uploadImgForm, imgUploadPreview, valueScaleInput, SCALE_CONTROL, uploadImgInput, setUserFormSubmit, closeFormEditingImg, closeFormEditingImgError};
