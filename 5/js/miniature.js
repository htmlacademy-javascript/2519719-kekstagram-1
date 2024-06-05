function miniature (photos) {
  const template = document.querySelector('#picture').content;
  const classPicture = template.querySelector('.picture');
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();


  photos.forEach((photo) => {
    const copyClassPuctire = classPicture.cloneNode(true);
    const img = copyClassPuctire.querySelector('.picture__img');
    const comments = copyClassPuctire.querySelector('.picture__comments');
    const likes = copyClassPuctire.querySelector('.picture__likes');
    img.src = photo.url;

    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;
    fragment.appendChild(copyClassPuctire);

  });
  pictures.appendChild(fragment);
}
export {miniature};
