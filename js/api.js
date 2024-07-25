const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method, body, onError = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      if (onError) {
        onError();
      }
      throw new Error(errorText);
    });

const getPhotos = (onError) => load(Route.GET_DATA, ErrorText.GET_DATA, Method.GET, null, onError);

const sendData = (body, onError) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body, onError);

export { getPhotos, sendData };
