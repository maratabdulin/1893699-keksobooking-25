
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('.map__checkbox');

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
  for (const feature of housingFeatures) { feature.addEventListener('change', () => cb());}
};

const pricingTypes = {
  'any': {start: 0, end: 200000},
  'low': {start: 0, end: 10000},
  'middle': {start: 10001, end: 50000},
  'high': {start: 50001, end: 200000},
};

const inRange = (x, min, max) => x >= min && x <= max;

const getAdvertRank = (advert) => {
  const rangePrices = pricingTypes[housingPrice.value];
  let rank = 0;
  if (advert.offer.type === housingType.value ) {
    rank += 2;
  }
  if (inRange( advert.offer.price, rangePrices.start, rangePrices.end )) {
    rank += 2;
  }
  if (advert.offer.rooms === +housingRooms.value ) {
    rank += 2;
  }
  if (advert.offer.guests === +housingGuests.value ) {
    rank += 2;
  }
  if (advert.offer.features) {
    const housingFeatureChecked = document.querySelectorAll('.map__checkbox[type=checkbox]:checked');
    for (const feature of housingFeatureChecked || '') {
      if (advert.offer.features.includes(feature.value)) {
        rank += 1;
      }
    }
  }
  return rank;
};

const compareAdverts = (advertA, advertB) => {
  const rankA = getAdvertRank(advertA);
  const rankB = getAdvertRank(advertB);
  return rankB - rankA;
};

const filterHousingType = (advert) => {
  if (housingType.value !== 'any') {
    return advert.offer.type === housingType.value;
  }
  return true;
};

const filterHousingPrice = (advert) => {
  if (housingPrice.value !== 'any') {
    const rangePrices = pricingTypes[housingPrice.value];
    return inRange( advert.offer.price, rangePrices.start, rangePrices.end );
  }
  return true;
};

const filterHousingRooms = (advert) => {
  if (housingRooms.value !== 'any') {
    return advert.offer.rooms === +housingRooms.value;
  }
  return true;
};

const filterHousingGuests = (advert) => {
  if (housingGuests.value !== 'any') {
    return advert.offer.guests === +housingGuests.value;
  }
  return true;
};

export {setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures,
  filterHousingType, filterHousingPrice, filterHousingRooms, filterHousingGuests, compareAdverts};

