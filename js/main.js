import {createMarkers} from './map.js';
import {provideData, GET_URL} from './api.js';
import {setUserFormSubmit} from './ad-form.js';
import {showSuccessWindow, showAlertWindow} from './util.js';

provideData(
  GET_URL,
  'GET',
  (adverts) => createMarkers(adverts),
  showAlertWindow,
);

setUserFormSubmit(showSuccessWindow);

