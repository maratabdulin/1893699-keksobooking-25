const ALERT_SHOW_TIME = 5000;

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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showSuccessWindow, showErrorWindow, showAlertWindow, debounce };
