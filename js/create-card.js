const offerTypeData = {
  palace: 'Дворец',
  flat: 'Квартира',
  house:'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const getFeaturesList = (element, data) => {
  if (data !== undefined) {
    element.forEach((featuresListItem) => {
      const isNecessary = data.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  }
  else {
    element.forEach((featuresListItem) => featuresListItem.remove());
  }
};

const getPhotosList = (element, data) => {
  if (data !== undefined) {
    element.innerHTML = '';
    data.forEach(
      (photoSrc) => {
        const photoItem = `<img src="${photoSrc}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
        element.innerHTML += photoItem;
      });
  }  else {
    element.innerHTML = '';
  }
};

const createCard = ({offer, author}) => {
  const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
  const advertElement = advertTemplate.cloneNode(true);
  const featuresList = advertElement.querySelectorAll('.popup__feature');
  const photosContainer = advertElement.querySelector('.popup__photos');

  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = offerTypeData[offer.type];
  if (offer.rooms > 1) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} человек`;
  }
  if (offer.rooms <= 1) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комната для ${offer.guests} человекa`;
  }
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advertElement.querySelector('.popup__description').textContent = offer.description;

  getFeaturesList(featuresList, offer.features);
  getPhotosList(photosContainer, offer.photos);

  advertElement.querySelector('.popup__avatar').src = author.avatar;
  return advertElement;
};

export {createCard};

