import {getPageActive, getPageInactive} from './page.js';
import {createAdverts} from './data.js';
import {createCard} from './create-card.js';

getPageInactive();

const advertsData = createAdverts();
const addressForm = document.querySelector('#address');

const startCoordinate = {
  lat: 35.68084,
  lng: 139.76748,
};

const map = L.map('map-canvas')
  .on('load', () => {
    getPageActive();
    addressForm.value = `${startCoordinate.lat.toFixed(5)}, ${startCoordinate.lng.toFixed(5)}`;
  })
  .setView({
    lat: startCoordinate.lat,
    lng: startCoordinate.lng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressForm.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

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

advertsData.forEach((advert) => {
  createMarker(advert);
});

