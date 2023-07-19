import { isAcceptKey, isEscapeKey } from './utils.js';

const COMMENTS_PER_PORTION = 5;

const openedPicture = document.querySelector('.big-picture');
const thumbnailImage = openedPicture.querySelector('img');
const likesCount = openedPicture.querySelector('.likes-count');
const commentsCount = openedPicture.querySelector('.comments-count');
const socialCaptionElement = openedPicture.querySelector('.social__caption');

const closeButton = openedPicture.querySelector('.big-picture__cancel');

const commentsContainer = openedPicture.querySelector('.social__comments');
const commentElement = openedPicture.querySelector('.social__comment');
const commentCountElement = openedPicture.querySelector('.social__comment-count');
const commentLoader = openedPicture.querySelector('.comments-loader');

const closeModal = () => {
  document.body.classList.remove('modal-open');
  openedPicture.classList.add('hidden');

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

const renderComments = (comments) => commentsContainer.append(...comments.map(createComment));

const clearComments = () => (commentsContainer.innerHTML = '');


const editComments = (comments) => {
  let shownComments = 0;

  const showNextComments = () => {
    clearComments();
    const nextComments = comments.slice(shownComments, shownComments + COMMENTS_PER_PORTION);
    const commentElements = nextComments.map(createComment);
    commentsContainer.append(...commentElements);

    shownComments += COMMENTS_PER_PORTION;

    if (shownComments >= comments.length) {
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
    }

    commentCountElement.textContent = `${Math.min(shownComments, comments.length)} из ${commentsCount.textContent}`;
  };

  showNextComments();

  const onLoaderClick = () => showNextComments();
  commentLoader.addEventListener('click', onLoaderClick);
};

const openPictureModal = (url, likes, comments, description) => {
  document.body.classList.add('modal-open');
  openedPicture.classList.remove('hidden');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaptionElement.textContent = description;

  clearComments();
  renderComments(comments);
  editComments(comments);

  document.addEventListener('keydown', onDocumentKeydown);
};


export { openPictureModal };
