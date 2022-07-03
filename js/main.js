import './big_photo.js';
import './util.js';
import './data.js';
import './user_photo.js';
import './slider.js';
import './form.js';
import './server.js';
import './popup.js';
import './filters.js';
import './upload-photo.js';
import {getData} from './server.js';
import {createPhoto} from './user_photo.js';
import {setUserFormSubmit, closeFormEditingImg} from './form.js';
import {onFilterDefaultClick, onFilterRandomClick, onFilterDiscussedClick} from './filters.js';
import {debounce} from './util.js';
import {getClickPhotoItem} from './big_photo.js';

getData((photos) => {
  createPhoto(photos);
  onFilterDefaultClick(photos, debounce(createPhoto), debounce(getClickPhotoItem));
  onFilterRandomClick(photos, debounce(createPhoto), debounce(getClickPhotoItem));
  onFilterDiscussedClick(photos, debounce(createPhoto), debounce(getClickPhotoItem));
});

setUserFormSubmit(closeFormEditingImg);
