import {priceOption} from './ad-form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: +priceField.min,
    max: +priceField.max,
  },
  start: +priceField.placeholder,
  step: 1,
  connect: true,
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

typeField.addEventListener('change', () =>  {
  sliderElement.noUiSlider.set([priceOption[typeField.value], null]);
});

priceField.addEventListener('change', () => {
  sliderElement.noUiSlider.set([priceField.value], null);
});
