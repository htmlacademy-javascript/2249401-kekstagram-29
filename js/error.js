import { isEscapeKey } from './utils.js';

const errorUploadMessageTemplateElement = document.querySelector('template#error').content
  .querySelector('.error');
const successUploadMessageTemplateElement = document.querySelector('template#success').content
  .querySelector('.success');

const onDocumentKeydown = (element, evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    element.remove();
  }
};

const showErrorUploadMessage = (message) => {
  const element = errorUploadMessageTemplateElement.cloneNode(true);
  element.querySelector('.error__title').textContent = message;
  element.addEventListener('click', () => element.remove());
  document.addEventListener('keydown', (evt) => onDocumentKeydown(element, evt));
  document.body.append(element);
};

const showSuccessUploadMessage = () => {
  const element = successUploadMessageTemplateElement.cloneNode(true);
  element.addEventListener('click', () => element.remove());
  document.addEventListener('keydown', (evt) => onDocumentKeydown(element, evt));
  document.body.append(element);
};

export { showSuccessUploadMessage, showErrorUploadMessage };
