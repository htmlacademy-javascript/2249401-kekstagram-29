const errorUploadMessageTemplateElement = document.querySelector('template#error').content
  .querySelector('.error');
const successUploadMessageTemplateElement = document.querySelector('template#success').content
  .querySelector('.success');

const showErrorUploadMessage = (message) => {
  const element = errorUploadMessageTemplateElement.cloneNode(true);
  element.querySelector('.error__title').textContent = message;
  element.addEventListener('click', () => element.remove());
  document.body.append(element);
};

const showSuccessUploadMessage = () => {
  const element = successUploadMessageTemplateElement.cloneNode(true);
  element.addEventListener('click', () => element.remove());
  document.body.append(element);
};

export { showSuccessUploadMessage, showErrorUploadMessage };
