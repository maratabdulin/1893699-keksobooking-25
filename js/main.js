import {createMarkers} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './ad-form.js';
import {showSuccessWindow, showAlertWindow} from './util.js';


getData((adverts) => createMarkers(adverts),
  () => showAlertWindow()
);

setUserFormSubmit(showSuccessWindow);

