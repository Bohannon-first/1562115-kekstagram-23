import {uploadImgInput} from './form.js';
import {imgUploadPreview} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Загрузка изображения в форму
uploadImgInput.addEventListener('change', () => {
  const file = uploadImgInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgUploadPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
