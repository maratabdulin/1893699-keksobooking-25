const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('input, select, textarea, button');
const mapFilter = document.querySelector('.map__filters');
const mapFiltersElements = mapFilter.querySelectorAll('input, select');

const getEnable = (nodeList) =>
  nodeList.forEach((nodeElement) => {
    nodeElement.disabled = false;
  });

const getDisable = (nodeList) => {
  nodeList.forEach((nodeElement) => {
    nodeElement.disabled = true;
  });
};

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  getEnable(adFormElements);
  getEnable(mapFiltersElements);
};

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  getDisable(adFormElements);
  getDisable(mapFiltersElements);
};

const disableMapForm = () => {
  mapFilter.classList.add('map__filters--disabled');
  getDisable(mapFiltersElements);
};

disablePage();

export {enablePage, disablePage, disableMapForm};
