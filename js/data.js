import {getRandomArrElements, getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrElement} from './util';

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

export {createAdvert};
