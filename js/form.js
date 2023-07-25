import { isEscapeKey } from './utils.js';
import {initScale, resetScale} from './scale.js';

const HASHTAG_MAX_COUNT = 5;
const TAG_ERROR_TEXT = 'Неправильно введены хештеги';
const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
// const uploadSubmit = document.querySelector('.img-upload__submit');

const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => HASHTAG_RULES.test(tag);
const hasValidateCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;
const hasUniqueTags = (tags) => tags.length === new Set(tags).size;

const validateTags = (value) => {
  const tags = value.trim().toLowerCase().split(' ');
  return hasValidateCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const closeUploadedImage = () => {
  form.reset();
  resetScale();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isElementActive = () => document.activeElement === hashtagsField || document.activeElement === commentField;

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isElementActive) {
    evt.preventDefault();
    closeUploadedImage();
  }
}

const onCloseButtonClick = closeUploadedImage;

const onImageUpload = () => {
  resetScale();
  pristine.reset();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    form.submit();
  }
};

const validateForm = () => {
  initScale();
  pristine.addValidator(hashtagsField, validateTags, TAG_ERROR_TEXT);

  form.addEventListener('submit', onFormSubmit);
  uploadInput.addEventListener('change', onImageUpload);
  uploadCancel.addEventListener('click', onCloseButtonClick);
};

export { validateForm };
