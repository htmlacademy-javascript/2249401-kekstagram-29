const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

const scaleField = document.querySelector('.scale__control--value');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scalePlus = document.querySelector('.scale__control--bigger');
const scalePreview = document.querySelector('.img-upload__preview img');

let currentValue = parseInt(scaleField.value, 10);

const transformScale = (value) => {
  scalePreview.style.transform = `scale(${value / 100})`;
  scaleField.value = `${value}%`;
};

const renderValidValue = (value) => value <= DEFAULT_SCALE && value >= MIN_SCALE;
const resetScale = () => transformScale(DEFAULT_SCALE);

const onMinusClick = () => {
  const changedValue = currentValue - SCALE_STEP;
  if (renderValidValue(changedValue)) {
    currentValue = changedValue;
    transformScale(currentValue);
  }
};

const onPlusClick = () => {
  const changedValue = currentValue + SCALE_STEP;
  if (renderValidValue(changedValue)) {
    currentValue = changedValue;
    transformScale(currentValue);
  }
};

const initScale = () => {
  resetScale();
  scaleMinus.addEventListener('click', onMinusClick);
  scalePlus.addEventListener('click', onPlusClick);
};

export { initScale, resetScale };
