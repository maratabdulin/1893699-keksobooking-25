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

const getRandomArrElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

const getRandomArrElements = (arr) => {
  const arrNumber = getRandomPositiveInteger(1, arr.length);
  const arrRandomList = arr.sort(() => Math.random() - 0.5);
  return arrRandomList.slice(0,arrNumber);
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrElements, getRandomArrElement};

