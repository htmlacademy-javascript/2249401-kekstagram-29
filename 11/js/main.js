import { createObjects } from './data.js';
import { addThumbnail } from './thumbnails.js';
import { validateForm } from './form.js';

const photos = createObjects();
addThumbnail(photos);
validateForm();
