import { isAcceptKey, isEscapeKey } from './utils.js';

const COMMENTS_PER_PORTION = 5;

const openedPicture = document.querySelector('.big-picture');
const thumbnailImage = openedPicture.querySelector('img');
const likesCount = openedPicture.querySelector('.likes-count');
const commentsCount = openedPicture.querySelector('.comments-count');
const commentsShown = openedPicture.querySelector('.comments-shown');
const socialCaptionElement = openedPicture.querySelector('.social__caption');

const closeButton = openedPicture.querySelector('.big-picture__cancel');

const commentsContainer = openedPicture.querySelector('.social__comments');
const commentElement = openedPicture.querySelector('.social__comment');
const commentLoader = openedPicture.querySelector('.comments-loader');

const clearComments = () => (commentsContainer.innerHTML = '');
let onLoaderClick;

const closeModal = () => {
  document.body.classList.remove('modal-open');
  openedPicture.classList.add('hidden');

  commentLoader.removeEventListener('click', onLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const onCloseButtonClick = closeModal;
const onAcceptButtonKeydown = (evt) => {
  if (isAcceptKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

closeButton.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onAcceptButtonKeydown);

const createComment = ({ name, avatar, message }) => {
  const newComment = commentElement.cloneNode(true);
  const commentPicture = newComment.querySelector('.social__picture');

  commentPicture.src = avatar;
  commentPicture.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const openPictureModal = (url, likes, comments, description) => {
  document.body.classList.add('modal-open');
  openedPicture.classList.remove('hidden');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  likesCount.textContent = likes;
  socialCaptionElement.textContent = description;

  clearComments();
  let shownComments = 0; // Используем локальную переменную для отслеживания показанных комментариев

  const updateCommentInfo = () => {
    commentsCount.textContent = comments.length;
    commentsShown.textContent = Math.min(shownComments, comments.length);
    if (shownComments >= comments.length) {
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
    }
  };

  onLoaderClick = () => {
    const nextComments = comments.slice(shownComments, shownComments + COMMENTS_PER_PORTION);
    const commentElements = nextComments.map(createComment);
    commentsContainer.append(...commentElements);

    shownComments += COMMENTS_PER_PORTION;
    updateCommentInfo();
  };

  updateCommentInfo(); // Обновляем информацию о комментариях и состоянии кнопки загрузки перед открытием фотографии
  commentLoader.removeEventListener('click', onLoaderClick);
  commentLoader.addEventListener('click', onLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);

  onLoaderClick();
};

export { openPictureModal };
