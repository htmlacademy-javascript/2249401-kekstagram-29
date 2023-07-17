// import { createThumbnails } from './thumbnails.js';

// createThumbnails();

const bodyElement = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');

const openedPicture = document.querySelector('.big-picture');
const thumbnailImage = openedPicture.querySelector('img');
const pictureLikes = openedPicture.querySelector('.likes-count');
const pictureComments = openedPicture.querySelector('.comments-count');

const closeButton = openedPicture.querySelector('.big-picture__cancel');

const commentsContainer = openedPicture.querySelector('.social__comments');
const commentElement = openedPicture.querySelector('.social__comment');
const commentCountElement = openedPicture.querySelector('.social__comment-count');
const commentsLoaderElement = openedPicture.querySelector('.comments-loader');
const socialCaptionElement = openedPicture.querySelector('.social__caption');

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    openedPicture.classList.add('hidden');
  }
};

const createComment = ({avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social-picture') = avatar;
  comment.querySelector('.socila-picture').alt = name;
  comment.querySelector('.social-text').textContent = message;

  return comment;
};

const openThumbnail = (url, likes, description) => {
  thumbnailImage.src = url;
  pictureLikes.textContent = likes;
  socialCaptionElement.textContent = description;

/*   comments.forEach(({ avatar, name, text }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${text}</p>
    `;
    commentsContainer.appendChild(commentElement);
  }); */

  openedPicture.classList.remove('hidden');
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const closeThumbnail = () => {
  openedPicture.classList.add('hidden');

  // Удаляем обработчик для закрытия окна по нажатию клавиши Esc
  document.removeEventListener('keydown', onEscKeyDown);
};

closeButton.addEventListener('click', closeThumbnail);

const onModalOpen = () => picturesContainer.addEventListener('click', (evt) => {
  const clickedThumbnail = evt.target.closest('.picture');
  if (clickedThumbnail) {
    const url = clickedThumbnail.querySelector('.picture__img').src;
    const description = clickedThumbnail.querySelector('.picture__img').alt;
    const likes = clickedThumbnail.querySelector('.picture__likes').textContent;
    const comments = [];

    openThumbnail(url, likes, comments, description);
  }
});

export { onModalOpen };
