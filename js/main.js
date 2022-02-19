const getRandomInt = (minNumber, maxNumber) => {
  if (maxNumber - minNumber < 0) {
    return null;
  }
  const max = Math.floor(maxNumber);
  const min = Math.ceil(minNumber);
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const getRandomFloat = (minNumber, maxNumber, fractionDigits = 0) => {
  if (maxNumber - minNumber < 0) {
    return null;
  }
  return  +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(fractionDigits);
};

const result1 = getRandomInt(2,15);
const result2 = getRandomInt(12,2);
const result3 = getRandomFloat(2,15, 4);
const result4 = getRandomFloat(12,2);
const result5 = getRandomFloat(0,3, 2);

console.log(result1, result2, result3, result4, result5);
