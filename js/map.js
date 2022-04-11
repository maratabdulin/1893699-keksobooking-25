import {enablePage} from './page.js';
import {createCard} from './create-card.js';
import {
  filterHousingGuests,
  filterHousingPrice,
  filterHousingRooms,
  filterHousingType,
  filterHousingFeatures
} from './filter.js';

const ADVERTS_COUNT = 10;
const addressForm = document.querySelector('#address');
const startCoordinate = {
  lat: 35.68084,
  lng: 139.76748,
};

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
    addressForm.value = `${startCoordinate.lat.toFixed(5)}, ${startCoordinate.lng.toFixed(5)}`;
  })
  .setView({
    lat: startCoordinate.lat,
    lng: startCoordinate.lng,
  }, 13);

const mapMainPin = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  }
);

const mapRegularPin = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }
);

const mainMarker = L.marker(
  {
    lat: startCoordinate.lat,
    lng: startCoordinate.lng,
  },
  {
    draggable: true,
    icon: mapMainPin,
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ({author, offer, location}) => {
  const regularMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: mapRegularPin,
    }
  );
  regularMarker
    .addTo(markerGroup)
    .bindPopup(createCard({author, offer}));
};

const createMarkers = (advertsData) => {
  markerGroup.clearLayers();
  advertsData
    .slice()
    .filter(filterHousingType)
    .filter(filterHousingPrice)
    .filter(filterHousingRooms)
    .filter(filterHousingGuests)
    .filter(filterHousingFeatures)
    .slice(0, ADVERTS_COUNT)
    .forEach(({author, offer, location}) => {
      createMarker({author, offer, location});
    });
};

const resetMap = () => {
  mainMarker.setLatLng(startCoordinate);
  addressForm.value = `${startCoordinate.lat}, ${startCoordinate.lng}`;
  const openPopup = document.querySelector('.leaflet-popup');
  if (openPopup) {
    openPopup.remove();
  }
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  addressForm.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

export {createMarkers, resetMap};
