const URL = {
  GET_DATA: 'https://29.javascript.pages.academy/kekstagram/data',
  POST_DATA: 'https://29.javascript.pages.academy/kekstagram',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const loadData = (url, method, body = null) =>
  fetch(url, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });

const getData = (onSuccess, onError) =>
  loadData(URL.GET_DATA, Method.GET)
    .then(onSuccess)
    .catch((err) => {
      onError(`${ErrorText.GET_DATA}. ${err.message}`);
    });

const sendData = (onSuccess, onError, body) =>
  loadData(URL.POST_DATA, Method.POST, body)
    .then(onSuccess)
    .catch((err) => {
      onError(`${ErrorText.SEND_DATA}. ${err.message}`);
    });

export { getData, sendData };
