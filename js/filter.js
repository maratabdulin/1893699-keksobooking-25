const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('.map__checkbox');

const pricingTypes = {
  'any': {start: 0, end: 200000},
  'low': {start: 0, end: 10000},
  'middle': {start: 10001, end: 50000},
  'high': {start: 50001, end: 200000},
};

const setHousingType = (cb) => {
  housingType.addEventListener('change', () => cb());

};
const setHousingPrice = (cb) => {
  housingPrice.addEventListener('change', () => cb());

};
const setHousingRooms = (cb) => {
  housingRooms.addEventListener('change', () => cb());

};
const setHousingGuests = (cb) => {
  housingGuests.addEventListener('change', () => cb());

};
const setHousingFeatures = (cb) => {
  housingFeatures.forEach((feature) => feature.addEventListener('change', () => cb()) );

};

const inRange = (x, min, max) => x >= min && x <= max;

const filterHousingType = (advert) => housingType.value !== 'any' ? advert.offer.type === housingType.value : true;

const filterHousingPrice = (advert) => {
  const rangePrices = pricingTypes[housingPrice.value];
  if (housingPrice.value !== 'any') {
    return inRange( advert.offer.price, rangePrices.start, rangePrices.end );
  }
  return true;
};

const filterHousingRooms = (advert) => housingRooms.value !== 'any' ? advert.offer.rooms === +housingRooms.value : true;

const filterHousingGuests = (advert) => housingGuests.value !== 'any' ? advert.offer.guests === +housingGuests.value : true;

const filterHousingFeatures = (advert) => {
  const housingFeatureClone = [...housingFeatures];
  if (housingFeatureClone.every((elem) => elem.checked === false)) {
    return true;
  }
  if (advert.offer.features) {
    const housingFeatureArr = housingFeatureClone.map((elem) => {
      if (elem.checked === true) {
        return elem.value;
      }
    }).filter((el) => el !== undefined);
    return housingFeatureArr.every((elem) => advert.offer.features.includes(elem));
  } else {
    return false;
  }
};

export {setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures,
  filterHousingType, filterHousingPrice, filterHousingRooms, filterHousingGuests, filterHousingFeatures};

