const offerTypeData = {
  palace: 'Palace',
  flat: 'Flat',
  house:'House',
  bungalow: 'Bungalow',
  hotel: 'Hotel',
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
        const photoItem = `<img src="${photoSrc}" class="popup__photo" width="45" height="40" alt="photo of place">`;
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
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/night`;
  advertElement.querySelector('.popup__type').textContent = offerTypeData[offer.type];
  if (offer.rooms > 1) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} rooms for ${offer.guests} person`;
  }
  if (offer.rooms <= 1) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} room for ${offer.guests} person`;
  }
  advertElement.querySelector('.popup__text--time').textContent = `Checkin after ${offer.checkin}, checkout before ${offer.checkout}`;
  advertElement.querySelector('.popup__description').textContent = offer.description;

  getFeaturesList(featuresList, offer.features);
  getPhotosList(photosContainer, offer.photos);

  advertElement.querySelector('.popup__avatar').src = author.avatar;
  return advertElement;
};

export {createCard};

