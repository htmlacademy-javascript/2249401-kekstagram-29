const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const loadData = (route = null, errorText, onError, method, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((err) => {
      onError(`${errorText}. ${err.message}`);
    });

const getData = (onSuccess, onError) => loadData(Route.GET_DATA, ErrorText.GET_DATA, Method.GET, onSuccess, onError);

const sendData = (onSuccess, onError, body) => loadData(ErrorText.SEND_DATA, Method.POST, onSuccess, onError, body);

export { getData, sendData };
