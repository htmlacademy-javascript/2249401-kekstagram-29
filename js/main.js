import { addThumbnail } from './thumbnails.js';
import { validateForm } from './form.js';
import { getData } from './api.js';

getData()
  .then((photos) => {
    addThumbnail(photos.slice(0, 25));
  });
validateForm();
