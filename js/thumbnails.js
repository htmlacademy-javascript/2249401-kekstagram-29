import { createObject } from './data.js';

// объявление переменных
const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarThumbnails = createObject();
const thumbnailsFragment = document.createDocumentFragment();
// генератор миниатюр

similarThumbnails.forEach(({url, description, likes, comments}) => {
  const thumbnailItem = thumbnailTemplate.cloneNode(true);
  thumbnailItem.querySelector('.picture__img').src = url;
  thumbnailItem.querySelector('.picture__img').alt = description;
  thumbnailItem.querySelector('.picture__likes').textContent = likes;
  thumbnailItem.querySelector('.picture__comments').textContent = comments;
  thumbnailsFragment.append(thumbnailItem);
});
// добавление миниатюры в контейнер
picturesContainer.append(thumbnailsFragment);
