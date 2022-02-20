const getRandomInt = (minNumber, maxNumber) => {
  if (maxNumber - minNumber < 0) {
    return null;
  }
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) ) + minNumber;
};

const getRandomFloat = (minNumber, maxNumber, fractionDigits = 0) => {
  if (maxNumber - minNumber < 0) {
    return null;
  }
  return  +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(fractionDigits);
};

getRandomInt(2, 15);
getRandomInt(12, 2);
getRandomFloat(2,15, 4);
getRandomFloat(12,2);
