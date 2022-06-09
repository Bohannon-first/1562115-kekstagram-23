import {picturesContainer} from './user_photo.js';
import {isEscEvent} from './util.js';

const MAX_LENGHT_HASHTAG = 20;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_LENGTH_TEXT_DESCRIPTION = 140;

const uploadImgInput = document.querySelector('#upload-file');
const uploadImgForm = picturesContainer.querySelector('.img-upload__overlay');
const uploadBtnClose = uploadImgForm.querySelector('#upload-cancel');
const inputHashtag = uploadImgForm.querySelector('.text__hashtags');
const inputDescription = uploadImgForm.querySelector('.text__description');

// Шаблон регулярного выражения
const templateHashtagCommon = /(^#[A-Za-zА-ЯЁа-яё0-9]{0,}$)s*/;

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

  document.addEventListener('keydown', onPopupEscKeydown);
};

// Функция закрытия формы
function closeFormEditingImg () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearFormEditing();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

// Обработчик change с показом формы редактирования фото
uploadImgInput.addEventListener('change', () => {
  openFormEditingImg();
});

// Обработчик клика закрытия формы редактирования фото
uploadBtnClose.addEventListener('click', () => {
  closeFormEditingImg();
});

// Сброс значения поля выбора файла формы редактирования после ее закрытия
function clearFormEditing () {
  uploadImgInput.value = '';
  inputHashtag.value = '';
  inputDescription.value = '';
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
