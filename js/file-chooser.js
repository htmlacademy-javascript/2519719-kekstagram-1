import { openForm } from './form.js';
import { uploadInput, preview } from './elements.js'

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    openForm();
  }
});
