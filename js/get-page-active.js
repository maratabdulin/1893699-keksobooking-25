const getEnabled = (nodeList) => {
  nodeList.forEach((nodeElement) => {
    nodeElement.disabled = false;
  });
};

const getPageActive = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormElements = adForm.querySelectorAll('input, select, textarea, button');
  const mapFilter = document.querySelector('.map__filters');
  const mapFiltersElements = mapFilter.querySelectorAll('input, select');

  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');

  getEnabled(adFormElements);
  getEnabled(mapFiltersElements);
};

export {getPageActive};
