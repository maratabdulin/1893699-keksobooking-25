import './filter.js';
import './avatar.js';
import './offer-photo.js';
import './slider.js';
import {createMarkerDebounced, createMarkers} from './map.js';
import {fetchData, GET_URL} from './api.js';
import {onFailSubmitForm, onSuccessSubmitForm, setUserFormSubmit} from './ad-form.js';
import {showAlertWindow} from './util.js';
import {setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures} from './filter.js';
import {disableMapForm} from './page.js';

fetchData(
  GET_URL,
  'GET',
  (adverts) => {
    createMarkers(adverts);
    setHousingType(createMarkerDebounced(adverts));
    setHousingPrice(createMarkerDebounced(adverts));
    setHousingRooms(createMarkerDebounced(adverts));
    setHousingGuests(createMarkerDebounced(adverts));
    setHousingFeatures(createMarkerDebounced(adverts));
  },
  () => {
    showAlertWindow();
    disableMapForm();
  },
);

setUserFormSubmit(onSuccessSubmitForm, onFailSubmitForm);

