const DEFAULT_EFFECT = 'none';
const Effects = {
  none: {
    name: 'none',
    filter: () => '',
    min: 0,
    max: 0,
    start: 0,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    filter: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  sepia: {
    name: 'sepia',
    filter: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  marvin: {
    name: 'marvin',
    filter: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  phobos: {
    name: 'phobos',
    filter: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  heat: {
    name: 'heat',
    filter: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

const previewImage = document.querySelector('.img-upload__preview img');
const effectElements = document.querySelectorAll('.effects__radio');
const effectSlider = document.querySelector('.img-upload__effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectsValue = document.querySelector('.effect-level__value');

const onSliderUpdate = (effect) => {
  const sliderValue = effectSliderElement.noUiSlider.get();
  previewImage.className = `effects__preview--${effect.name}`;
  previewImage.style.filter = effect.filter(sliderValue);
  effectsValue.value = sliderValue;
};

const makeSliderOptions = (effect) => ({
  range: {
    min: effect.min,
    max: effect.max,
  },
  start: effect.start,
  step: effect.step,
  connect: 'lower',
});


const applyEffect = (effect) => {
  if (effect) {
    effectSliderElement.noUiSlider.updateOptions(makeSliderOptions(effect));
    effectSliderElement.noUiSlider.off('slide');
    effectSliderElement.noUiSlider.on('slide', () => onSliderUpdate(effect));
    onSliderUpdate(effect);
  }
};

const resetEffects = () => {
  const defaultEffect = Effects[DEFAULT_EFFECT];
  effectSlider.classList.add('hidden');
  applyEffect(defaultEffect);
  previewImage.className = `effects__preview--${defaultEffect.name}`;
  previewImage.style.filter = defaultEffect.filter(defaultEffect.start);
  effectsValue.value = defaultEffect.start;
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const selectedEffect = Effects[evt.target.value];
    if (selectedEffect.name === DEFAULT_EFFECT) {
      effectSlider.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
    }
    applyEffect(selectedEffect);
  }
};

effectElements.forEach((element) => element.addEventListener('change', onEffectsChange));

const initEffects = () => {
  noUiSlider.create(effectSliderElement, makeSliderOptions(Effects[DEFAULT_EFFECT]));
  resetEffects();
};

export { initEffects, resetEffects };
