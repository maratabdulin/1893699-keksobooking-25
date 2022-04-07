const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('input, select, textarea, button');
const mapFilter = document.querySelector('.map__filters');
const mapFiltersElements = mapFilter.querySelectorAll('input, select');

const getEnabled = (nodeList) => {
  nodeList.forEach((nodeElement) => {
    nodeElement.disabled = false;
  });
};

const getDisabled = (nodeList) => {
  nodeList.forEach((nodeElement) => {
    nodeElement.disabled = true;
  });
};

const getPageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  getEnabled(adFormElements);
  getEnabled(mapFiltersElements);
};

const getPageInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  getDisabled(adFormElements);
  getDisabled(mapFiltersElements);
};

const getMapFormInactive = () => {
  mapFilter.classList.add('map__filters--disabled');
  getDisabled(mapFiltersElements);
};

export {getPageActive, getPageInactive, getMapFormInactive};
