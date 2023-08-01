import { addThumbnail } from './thumbnails.js';
import { validateForm, closeUploadedImage, unblockSubmitButton, blockSubmitButton } from './form.js';
import { getData, sendData } from './api.js';
import { showSuccessUploadMessage, showErrorUploadMessage } from './error.js';
import { showAlert, debounce } from './utils.js';

const filter = document.querySelector('.img-filters');
const filterButtonDefault = document.querySelector('.img-filters__button#filter-default');
const filterButtonRandom = document.querySelector('.img-filters__button#filter-random');
const filterButtonDiscussed = document.querySelector('.img-filters__button#filter-discussed');

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

const setDefaultFilter = (photos) => {
  filterButtonDefault.addEventListener('click', debounce(() => {
    addThumbnail(photos);
  }));
};

const setRandomFilter = (photos) => {
  filterButtonRandom.addEventListener('click', debounce(() => {
    const randomPhotos = photos.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    addThumbnail(randomPhotos);
  }));
};

const setDiscussedFilter = (photos) => {
  filterButtonDiscussed.addEventListener('click', debounce(() => {
    const sortedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    addThumbnail(sortedPhotos);
  }));
};

getData()
  .then((photos) => {
    addThumbnail(photos);
    filter.classList.remove('img-filters--inactive');
    setDefaultFilter(photos);
    setRandomFilter(photos);
    setDiscussedFilter(photos);
    const handleFormSubmit = (formData) => sendData(onSendDataSuccess, onSendDataError, formData);
    validateForm(handleFormSubmit);
  })
  .catch((err) => {
    showAlert(err.message);
  });

