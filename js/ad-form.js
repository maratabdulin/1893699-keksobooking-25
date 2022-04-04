import {fetchData, POST_URL} from './api.js';
import {showErrorWindow} from './util.js';
import {resetMap} from './map.js';

const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const mapForm = document.querySelector('.map__filters');

const pristine = new Pristine (form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorTextTag: 'div',
}, true);

const roomNumberField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const roomsNumberOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateRooms = () => roomsNumberOption[roomNumberField.value].includes(capacityField.value);

const onCapacityFormChange = () => {
  pristine.validate(capacityField);
};

const getRoomsErrorMessage = () => {
  if (roomNumberField.value === '1') {
    return 'только для одного гостя';
  }
  if (roomNumberField.value === '2') {
    return 'не более двух гостей';
  }
  if (roomNumberField.value === '3') {
    return 'не более трех гостей';
  }
  return 'не для гостей';
};

pristine.addValidator(capacityField, validateRooms, getRoomsErrorMessage);
roomNumberField.addEventListener('change', onCapacityFormChange);

const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const priceOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

typeField.addEventListener('change', () => {
  priceField.placeholder = priceOption[typeField.value];
  priceField.min = priceOption[typeField.value];
});

const validatePrice = () => +priceField.value >= priceOption[typeField.value];
const priceErrorMessage = () => {
  const minPrice = +priceField.min;
  return `минимальная цена ${minPrice} руб.`;
};

const onTypeFormChange = () => {
  pristine.validate(priceField);
};

pristine.addValidator(priceField, validatePrice, priceErrorMessage);
typeField.addEventListener('change', onTypeFormChange);

const timeinField = form.querySelector('#timein');
const timeoutField = form.querySelector('#timeout');

timeinField.addEventListener('change', () => {
  timeoutField.value = timeinField.value;
});

timeoutField.addEventListener('change', () => {
  timeinField.value = timeoutField.value;
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      fetchData(
        POST_URL,
        'POST',
        () => {
          onSuccess();
          unblockSubmitButton();
          form.reset();
          mapForm.reset();
          resetMap();
        },
        showErrorWindow,
        new FormData(evt.target)
      );
    }
  });
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  mapForm.reset();
  resetMap();
});

export {priceOption, setUserFormSubmit};
