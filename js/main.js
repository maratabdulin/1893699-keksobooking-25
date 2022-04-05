import {createMarkers} from './map.js';
import {fetchData, GET_URL} from './api.js';
import {setUserFormSubmit} from './ad-form.js';
import {showSuccessWindow, showAlertWindow, debounce} from './util.js';
import {setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures} from './filter.js';
import './filter.js';
import './avatar.js';
import './offer-photo.js';
import {getMapFormInactive} from './page.js';

fetchData(
  GET_URL,
  'GET',
  (adverts) => {
    createMarkers(adverts);
    setHousingType(debounce(() => createMarkers(adverts)));
    setHousingPrice(debounce(() => createMarkers(adverts)));
    setHousingRooms(debounce(() => createMarkers(adverts)));
    setHousingGuests(debounce(() => createMarkers(adverts)));
    setHousingFeatures(debounce(() => createMarkers(adverts)));
  },
  () => {
    showAlertWindow();
    getMapFormInactive();
  },
);

setUserFormSubmit(showSuccessWindow);

