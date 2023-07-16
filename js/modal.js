import { createThumbnails } from './thumbnails.js';

createThumbnails();

const picturesContainer = document.querySelector('.pictures');
const openedPicture = document.querySelector('.big-picture');
const thumbnailImage = openedPicture.querySelector('img');
const pictureLikes = openedPicture.querySelector('.likes-count');
const pictureComments = openedPicture.querySelector('.comments-count');
const closeButton = openedPicture.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentsContainer = openedPicture.querySelector('.social__comments');
const commentCountElement = openedPicture.querySelector('.social__comment-count');
const commentsLoaderElement = openedPicture.querySelector('.comments-loader');
const socialCaptionElement = openedPicture.querySelector('.social__caption');

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    openedPicture.classList.add('hidden');
  }
};

const openThumbnail = (url, likes, comments, description) => {
  thumbnailImage.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;
  socialCaptionElement.textContent = description;

  // Очищаем контейнер с комментариями
  commentsContainer.innerHTML = '';

  // Добавляем комментарии в контейнер
  comments.forEach(({ avatar, name, text }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${text}</p>
    `;
    commentsContainer.appendChild(commentElement);
  });

  // Скрываем счетчик комментариев и загрузчик новых комментариев
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  // Добавляем класс для блокировки скролла на фоновом контейнере
  bodyElement.classList.add('modal-open');

  // Открываем окно
  openedPicture.classList.remove('hidden');

  // Добавляем обработчик для закрытия окна по нажатию клавиши Esc
  document.addEventListener('keydown', onEscKeyDown);
};

const closeThumbnail = () => {
  openedPicture.classList.add('hidden');

  // Удаляем обработчик для закрытия окна по нажатию клавиши Esc
  document.removeEventListener('keydown', onEscKeyDown);
};

closeButton.addEventListener('click', closeThumbnail);

picturesContainer.addEventListener('click', (evt) => {
  const clickedThumbnail = evt.target.closest('.picture');
  if (clickedThumbnail) {
    const url = clickedThumbnail.querySelector('.picture__img').src;
    const description = clickedThumbnail.querySelector('.picture__img').alt;
    const likes = clickedThumbnail.querySelector('.picture__likes').textContent;
    const comments = []; // Получить комментарии соответствующей фотографии

    openThumbnail(url, likes, comments, description);
  }
});
