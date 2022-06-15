import {uploadImgForm, imgUploadPreview} from './form.js';

const sliderContainer = uploadImgForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadImgForm.querySelector('.effect-level__slider');
const sliderValueEffect = uploadImgForm.querySelector('.effect-level__value');
const effectsList = uploadImgForm.querySelector('.effects__list');
const elementEffectNone = uploadImgForm.querySelector('#effect-none');

const EFFECT_CLASSES_DICTIONARY = {
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
};

const movingSlider = (filterValue) => {
  if (filterValue === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
  } else if (filterValue === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
  } else if (filterValue === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    });
  } else if (filterValue === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  } else if (filterValue === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  } else {
    // sliderElement.noUiSlider.destroy();
  }
};

// Функция проверки и скрытия слайдера при выборе фильтра/эффекта "Оригинал"
const isOriginalEffect = () => {
  if (elementEffectNone.checked) {
    sliderContainer.classList.add('hidden');
    sliderValueEffect.setAttribute('value', '');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

// Сброс всех значений фильтров при переключении
const resetFilterValues = () => {
  imgUploadPreview.className = '';
};

let imgWidthSelectedFilter;

const onEffectsListClick = (evt) => {
  resetFilterValues();
  isOriginalEffect();
  if (evt.target.matches('.effects__radio')) {
    const value = evt.target.value;
    for (const effect in EFFECT_CLASSES_DICTIONARY) {
      if (value === effect) {
        imgUploadPreview.classList.add(`${EFFECT_CLASSES_DICTIONARY[effect]}`);
        imgWidthSelectedFilter = imgUploadPreview;
        // imgUploadPreview.style.filter = `grayscale(${+sliderValueEffect.getAttribute('value')})`;
        // const cssStyle = getComputedStyle(imgUploadPreview);
        // console.log(cssStyle);
      }
    }
    movingSlider(value);
    // imgUploadPreview.style.filter = sliderValueEffect.getAttribute('value');
    // const valueFilter = sliderValueEffect.getAttribute('value');
    // console.log(sliderValueEffect.getAttribute('value'));
  }
  // console.log(imgWidthSelectedFilter);
};

// Обработчик на родительский контейнер всех фильтров с делегированием
effectsList.addEventListener('change', onEffectsListClick);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
      // return Math.round(value);
    },
    from: function (value) {
      return parseFloat(value);
      // return Math.round(value);
    },
  },
});

// let valueEffect;
sliderElement.noUiSlider.on('update', (values, handle) => {
  const valueEffect = values[handle];
  sliderValueEffect.setAttribute('value', valueEffect);
  imgWidthSelectedFilter.style.filter = `grayscale(${+sliderValueEffect.getAttribute('value')})`;

  console.log(+sliderValueEffect.getAttribute('value'));
  // sliderValueEffect.setAttribute('value', `${values[handle]}`);
});

export {resetFilterValues, isOriginalEffect};
