const GET_URL = 'https://25.javascript.pages.academy/keksobooking/data/';
const POST_URL = 'https://25.javascript.pages.academy/keksobooking/404';

const provideData = (url, method, onSuccess, onFail, body) => {
  fetch(
    url,
    {
      method: method,
      body,
    },
  ).then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error;
    }
  })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => onFail());
};

export {provideData, GET_URL, POST_URL};
