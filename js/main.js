const ADVERT_COUNT = 10;
const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
const CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

// Делаем массив для обозначения уникальных номеров в ссылках на аватар
const avatarNumbers = Array.from({length: ADVERT_COUNT}, (_, i) => i + 1);
// Рандомизируем массив
const avatarRandomNumbers = avatarNumbers.sort(() => Math.random() - 0.5);

const getAvatarNumber = () => {
  const avatarNumber = avatarRandomNumbers.pop();
  if (avatarNumber < 10) {
    return `0${avatarNumber}`;
  }
  return avatarNumber;
};

const getRandomArrElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

const getRandomArrElements = (arr) => {
  const arrNumber = getRandomPositiveInteger(1, arr.length);
  const arrRandomList = arr.sort(() => Math.random() - 0.5);
  return arrRandomList.slice(0,arrNumber);
};

const getPrice = () => getRandomPositiveInteger(1000, 10000);

const getRoomsNumber = () => getRandomPositiveInteger(1,5);

const getGuestsNumber = () => getRandomPositiveInteger(1,12);

const getLocationLat = () => getRandomPositiveFloat(35.65000, 35.70000, 5);

const getLocationLng = () => getRandomPositiveFloat(139.70000, 139.80000, 5);

const createAdvert = () => {
  const locationLat = getLocationLat();
  const locationLng = getLocationLng();
  return {
    author: { avatar: `img/avatars/user${getAvatarNumber()}.png` },
    offer: {
      title: 'Апартаменты с видом на море',
      address: `${locationLat}, ${locationLng}`,
      price: getPrice(),
      type: getRandomArrElement(APARTMENT_TYPES),
      rooms: getRoomsNumber(),
      guests: getGuestsNumber(),
      checkin: getRandomArrElement(CHECKIN_OPTIONS),
      checkout: getRandomArrElement(CHECKOUT_OPTIONS),
      features: getRandomArrElements(FEATURES),
      description: 'Апартаменты имеют большие просторные окна, дизайн в минималистическом стиле, практичный и функциональный',
      photos: getRandomArrElements(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

Array.from({length: ADVERT_COUNT}, createAdvert);
