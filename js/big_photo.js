import {isEscEvent, isOverlayClick} from './util.js';

const NUMBER_COMMENT_SHOWN = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentCount = bigPicture.querySelector('.comments-count');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureBtnClose = bigPicture.querySelector('.big-picture__cancel');
const downloadMoreCommentsBtn = bigPicture.querySelector('.comments-loader');
const commentCountShown = bigPicture.querySelector('.comments-count-shown');

// Проверка на нажатую кнопку Esc и закрытие полноэкранной фотографии
const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

// Проверка по клику на оверлей и закрытие полноэкранной фотографии
const onBigPictureOverlayClick = (evt) => {
  if (isOverlayClick(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

// Проверка есть ли комментарии к фотографии
const areCheckAnyComments = (commentsArray) => {
  if (!commentsArray.length) {
    downloadMoreCommentsBtn.classList.add('hidden');
  } else {
    downloadMoreCommentsBtn.classList.remove('hidden');
  }
};

// Массив со всеми комментариями к фотографии
let arrayComments = [];

// Вывести количество показанных комментариев
const getQuantityShownComments = () => {
  commentCountShown.textContent = +commentCount.textContent - arrayComments.length;
};

// Удаляем и показываем пять первых комментариев из массива при клике Загрузить еще
const showMoreComments = () => {
  arrayComments.splice(0, NUMBER_COMMENT_SHOWN).forEach((comment) => {
    socialCommentList.appendChild(comment);
    areCheckAnyComments(arrayComments);
    getQuantityShownComments();
  });
};

// Получаю из массива комментарии, создаю разметку и вставляю их под фото
const getComments = (array) => {

  array.forEach((elem) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const commentPicture = document.createElement('img');
    commentPicture.classList.add('social__picture');
    commentPicture.src = elem.avatar;
    commentPicture.alt = elem.name;
    commentPicture.width = 35;
    commentPicture.height = 35;
    commentElement.appendChild(commentPicture);
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = elem.message;
    commentElement.appendChild(commentText);
    arrayComments.push(commentElement);
  });
  arrayComments.splice(0, NUMBER_COMMENT_SHOWN).forEach((comment) => {
    socialCommentList.appendChild(comment);
  });
  areCheckAnyComments(arrayComments);
  getQuantityShownComments();
};

// Создание большой фотографии и наполнение ее данными
const showBigPicture = (elem, array) => {
  for (let i = 0; i <= array.length - 1; i ++ ) {
    if (array[i].url === elem.getAttribute('src')) {
      const currentPhoto = array[i];

      bigPicture.classList.remove('hidden');
      bigPictureImg.src = currentPhoto.url;
      likesCount.textContent = currentPhoto.likes;
      commentCount.textContent = currentPhoto.comments.length;
      socialCaption.textContent = currentPhoto.description;
      document.querySelector('body').classList.add('modal-open');
      getComments(currentPhoto.comments);

      document.addEventListener('keydown', onBigPictureEscKeydown);
      document.addEventListener('click', onBigPictureOverlayClick);
      downloadMoreCommentsBtn.addEventListener('click', showMoreComments);
    }
  }
};

// Навешивание обработчиков клика на каждую маленькую фотографию
const getClickPhotoItem = (arrayPhotos) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      const photoElement = evt.target;
      socialCommentList.innerHTML = '';
      showBigPicture(photoElement, arrayPhotos);
    });
  });
};

// Функция закрытия полноэкранной фотографии
function bigPictureClose () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  arrayComments = [];

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  document.removeEventListener('click', onBigPictureOverlayClick);
  downloadMoreCommentsBtn.removeEventListener('click', showMoreComments);
}

//  Обработчик закрытия полноэкранной фотографии по клику на крестик
bigPictureBtnClose.addEventListener('click', () => {
  bigPictureClose();
});

export {bigPicture, showBigPicture, getClickPhotoItem};
