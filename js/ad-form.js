import {fetchData, POST_URL} from './api.js';
import {showErrorWindow, showSuccessWindow} from './util.js';
import {resetMap} from './map.js';

const priceOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomsNumberOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const form = document.querySelector('.ad-form');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const mapForm = document.querySelector('.map__filters');

const roomNumberField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const timeinField = form.querySelector('#timein');
const timeoutField = form.querySelector('#timeout');

const pristine = new Pristine (form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorTextTag: 'div',
}, true);

const showPriceError = () => `минимальная цена ${+priceField.min} руб.`;
const showRoomsError = () => {
  switch (roomNumberField.value) {
    case '1':
      return 'только для одного гостя';
    case '2':
      return 'не более двух гостей';
    case '3':
      return 'не более трех гостей';
    default:
      return 'не для гостей';
  }
};
const validatePrice = () => +priceField.value >= priceOption[typeField.value];
const validateRooms = () => roomsNumberOption[roomNumberField.value].includes(capacityField.value);
const onCapacityFormChange = () => pristine.validate(capacityField);
const onTypeFormChange = () => pristine.validate(priceField);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
const resetPicturePreview = () => {
  const avatarPreview = document.querySelector('.avatar__preview');
  const offerPhotoContainer = document.querySelector('.ad-form__photo');
  avatarPreview.src = 'img/muffin-grey.svg';
  offerPhotoContainer.innerHTML = '';
};

const onSuccessSubmitForm = () => {
  unblockSubmitButton();
  resetPicturePreview();
  form.reset();
  mapForm.reset();
  resetMap();
  showSuccessWindow();
};

const onFailSubmitForm = () => {
  showErrorWindow();
  unblockSubmitButton();
};

const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      fetchData(
        POST_URL,
        'POST',
        () => onSuccess(),
        () => onFail(),
        new FormData(evt.target)
      );
    }
  });
};

pristine.addValidator(capacityField, validateRooms, showRoomsError);
pristine.addValidator(priceField, validatePrice, showPriceError);

roomNumberField.addEventListener('change', onCapacityFormChange);
typeField.addEventListener('change', () => {
  priceField.min = priceOption[typeField.value];
});
typeField.addEventListener('change', onTypeFormChange);
timeinField.addEventListener('change', () => {
  timeoutField.value = timeinField.value;
});
timeoutField.addEventListener('change', () => {
  timeinField.value = timeoutField.value;
});
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  mapForm.reset();
  resetMap();
  resetPicturePreview();
});

export {priceOption, setUserFormSubmit, onSuccessSubmitForm, onFailSubmitForm};
