const ALERT_SHOW_TIME = 5000;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

const getRandomArrElements = (arr) => {
  const arrNumber = getRandomPositiveInteger(1, arr.length);
  const arrRandomList = arr.sort(() => Math.random() - 0.5);
  return arrRandomList.slice(0,arrNumber);
};

const getRandomObjValue = (obj) => {
  const objectKeysArr = Object.keys(obj);
  const randomArrNumber = Math.floor(Math.random() * objectKeysArr.length);
  return obj[objectKeysArr[randomArrNumber]];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showSuccessWindow = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  successElement.addEventListener('click', () => (document.body.removeChild(successElement)));
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successElement.remove();
    }
  });
};

const showErrorWindow = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  errorElement.addEventListener('click', () => (document.body.removeChild(errorElement)));
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorElement.remove();
    }
  });
};

const showAlertWindow = () => {
  const alertTemplate = document.querySelector('#alert').content.querySelector('.alert');
  const alertElement = alertTemplate.cloneNode(true);
  document.body.append(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomPositiveInteger, getRandomPositiveFloat,
  getRandomArrElements, getRandomArrElement, getRandomObjValue,
  showSuccessWindow, showErrorWindow, showAlertWindow
};

