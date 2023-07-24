import { isEscapeKey } from './utils.js';

const MESSAGE_ERROR_TEXT = '';


const uploadInput = document.querySelector('img-upload__input');
const uploadOverlay = document.querySelector('img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');

const onImageUpload = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeUploadedImage = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadedImage();
  }
};

const onCloseButtonClick = closeUploadedImage;
uploadCancel.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

uploadInput.addEventListener('change', onImageUpload);

