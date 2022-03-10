const getDisabled = (nodeList) => {
  nodeList.forEach((nodeElement) => {
    nodeElement.disabled = true;
  });
};

const getPageInactive = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormElements = adForm.querySelectorAll('input, select, textarea, button');
  const mapFilter = document.querySelector('.map__filters');
  const mapFiltersElements = mapFilter.querySelectorAll('input, select');

  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');

  getDisabled(adFormElements);
  getDisabled(mapFiltersElements);
};

export {getPageInactive};
