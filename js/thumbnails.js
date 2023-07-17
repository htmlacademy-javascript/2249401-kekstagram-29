// import { openBigPictureModal } from './modal.js';

const thumbnailElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnailElement = ({ url, likes, comments, description }) => {
  const element = thumbnailTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__img').alt = description;


  // Добавляем обработчик события для открытия модального окна
  // element.addEventListener('click', () => openBigPictureModal(url, likes, comments, description));

  return element;
};

const addThumbnail = (similarThumbnails) => {
  similarThumbnails = Array.from(similarThumbnails);
  thumbnailElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const thumbnailElements = similarThumbnails.map(createThumbnailElement);
  thumbnailElement.append(...thumbnailElements);
};

export { addThumbnail };
