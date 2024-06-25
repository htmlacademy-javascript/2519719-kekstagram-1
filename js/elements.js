const bigPicture = document.querySelector('.big-picture');
const buttonCancel = bigPicture.querySelector('.big-picture__cancel');
const srcBigPicture = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const comments = bigPicture.querySelector('.comments-count');
const description = bigPicture.querySelector('.social__caption');
const listComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const template = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
export {
  bigPicture, buttonCancel, srcBigPicture, likes, comments, description, listComments,
  socialComment, template, pictures
};
