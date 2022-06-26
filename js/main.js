import './big_photo.js';
import './util.js';
import './data.js';
import './user_photo.js';
import './slider.js';
import './form.js';
import './server.js';
import './popup.js';
import {getData} from './server.js';
import {createPhoto} from './user_photo.js';
import {setUserFormSubmit, closeFormEditingImg, closeFormEditingImgError} from './form.js';

getData((photo) => {
  createPhoto(photo);
});

setUserFormSubmit(closeFormEditingImg, closeFormEditingImgError);
