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
  showSuccessUploadMessage();
  closeUploadedImage();
};

const onSendDataError = (err) => {
  showErrorUploadMessage(err);
  unblockSubmitButton();
};

const setActiveButton = (activeButton) => {
  const filterButtons = document.querySelectorAll('.img-filters__button');

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  activeButton.classList.add('img-filters__button--active');
};


const setDefaultFilter = (photos) => {
  filterButtonDefault.addEventListener('click', debounce(() => {
    addThumbnail(photos);
    setActiveButton(filterButtonDefault);
  }));
};

const setRandomFilter = (photos) => {
  filterButtonRandom.addEventListener('click', debounce(() => {
    const randomPhotos = photos.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    addThumbnail(randomPhotos);
    setActiveButton(filterButtonRandom);
  }));
};

const setDiscussedFilter = (photos) => {
  filterButtonDiscussed.addEventListener('click', debounce(() => {
    const sortedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    addThumbnail(sortedPhotos);
    setActiveButton(filterButtonDiscussed);
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

