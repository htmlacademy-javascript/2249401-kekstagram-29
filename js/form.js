import { isEscapeKey } from './utils.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './slider.js';

const HASHTAG_MAX_COUNT = 5;
const TAG_ERROR_TEXT = 'Неправильно введены хештеги';
const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadSubmit = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');

const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

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

const onLocalPicturePreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

const isUploadOverlayVisible = () => !uploadOverlay.classList.contains('hidden');
const isElementActive = () => document.activeElement === hashtagsField || document.activeElement === commentField;

const closeUploadedImage = () => {
  form.reset();
  resetScale();
  pristine.reset();
  if (isUploadOverlayVisible()) {
    uploadOverlay.classList.add('hidden');
  }
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isElementActive() && isUploadOverlayVisible()) {
    evt.preventDefault();
    closeUploadedImage();
  }
}

const onCloseButtonClick = closeUploadedImage;

const blockSubmitButton = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = SubmitButtonText.IDLE;
};

const onImageUpload = () => {
  resetScale();
  resetEffects();
  pristine.reset();
  if (uploadOverlay) {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const validateForm = (handleData) => {
  initScale();
  initEffects();
  pristine.addValidator(hashtagsField, (value) => {
    if (value.trim().length === 0) {
      return true;
    }
    return validateTags(value);
  }, TAG_ERROR_TEXT);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      handleData(formData)
        .finally(unblockSubmitButton);
    }
  }
  );

  uploadInput.addEventListener('change', onLocalPicturePreview);
  uploadInput.addEventListener('change', onImageUpload);
  uploadCancel.addEventListener('click', onCloseButtonClick);
};

export { validateForm, closeUploadedImage, blockSubmitButton, unblockSubmitButton };
