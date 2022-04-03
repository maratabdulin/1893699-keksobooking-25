import {createMarkers} from './map.js';
import {fetchData, GET_URL} from './api.js';
import {setUserFormSubmit} from './ad-form.js';
import {showSuccessWindow, showAlertWindow} from './util.js';
import {setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures} from './filter.js';
import './filter.js';

fetchData(
  GET_URL,
  'GET',
  (adverts) => {
    createMarkers(adverts);
    setHousingType(() => createMarkers(adverts));
    setHousingPrice(() => createMarkers(adverts));
    setHousingRooms(() => createMarkers(adverts));
    setHousingGuests(() => createMarkers(adverts));
    setHousingFeatures(() => createMarkers(adverts));
  },
  showAlertWindow,
);

setUserFormSubmit(showSuccessWindow);

