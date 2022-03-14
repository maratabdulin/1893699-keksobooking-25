const form = document.querySelector('.ad-form');

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

const onFormChange = () => {
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
roomNumberField.addEventListener('change', onFormChange);

form.addEventListener('submit', (evt) => {
  //if the pristine check fails, prevent the form from being submitted
  if(!pristine.validate()){
    evt.preventDefault();
  }
});

