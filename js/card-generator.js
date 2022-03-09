import {createAdverts} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdverts = createAdverts();
const similarAdvertsFragment = document.createDocumentFragment();

similarAdverts.forEach(({offer, author}) => {
  const advertElement = advertTemplate.cloneNode();
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = offer.type;
  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests}`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advertElement.querySelector('.popup__description').textContent = offer.description;

  const featuresList = advertElement.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = offer.features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  const photosContainer = advertElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  offer.photos.forEach(
    (photoSrc) => {
      const photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = photoSrc;
      photoItem.alt = 'Фотография жилья';
      photoItem.width = 45;
      photoItem.height = 40;
      photosContainer.append(photoItem);
    }
  );

  advertElement.querySelector('.popup__avatar').src = author.avatar;
  similarAdvertsFragment.appendChild(advertElement);
});

mapCanvas.appendChild(similarAdvertsFragment);

