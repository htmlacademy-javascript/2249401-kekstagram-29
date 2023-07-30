import { addThumbnail } from './thumbnails.js';
import { validateForm, closeUploadedImage, unblockSubmitButton, blockSubmitButton } from './form.js';
import { getData, sendData } from './api.js';
import { showSuccessUploadMessage, showErrorUploadMessage } from './error.js';
import { showAlert } from './utils.js';

const PHOTOS_AMOUNT = 25;

const onSendDataSuccess = () => {
  blockSubmitButton();
  setTimeout(() => {
    showSuccessUploadMessage();
  }, 500);
  closeUploadedImage();
};

const onSendDataError = (err) => {
  showErrorUploadMessage(err);
  unblockSubmitButton();
};

getData()
  .then((photos) => {
    addThumbnail(photos.slice(0, PHOTOS_AMOUNT));
    const handleFormSubmit = (formData) => sendData(onSendDataSuccess, onSendDataError, formData);
    validateForm(handleFormSubmit);
  })
  .catch((err) => {
    showAlert(err.message);
  });

