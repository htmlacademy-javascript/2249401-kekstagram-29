import { createObjects } from './data.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsFragment = document.createDocumentFragment();
// генератор миниатюр

const addThumbnail = (similarThumbnails) => {
  similarThumbnails = Array.from(similarThumbnails);
  similarThumbnails.forEach(({ url, description, likes, comments }) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);
    thumbnailItem.querySelector('.picture__img').src = url;
    thumbnailItem.querySelector('.picture__img').alt = description;
    thumbnailItem.querySelector('.picture__likes').textContent = likes;
    thumbnailItem.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsFragment.append(thumbnailItem);
  });
  picturesContainer.append(thumbnailsFragment);
};
// добавление миниатюры в контейнер

const createThumbnails = () => addThumbnail(createObjects());

export { createThumbnails };
