const bigPicture = document.querySelector('.big-picture');
const bigPictureButtonCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureListComments = bigPicture.querySelector('.social__comments');
const bigPictureSocialComment = bigPicture.querySelector('.social__comment');
const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const miniaturePictures = document.querySelector('.pictures');
const bigPictureShowMoreComments = document.querySelector('.comments-loader');
const bigPictureCountComment = document.querySelector('.social__comment-count');

export {
    bigPicture, bigPictureButtonCancel, bigPictureImg, bigPictureLikes, bigPictureComments, bigPictureDescription, bigPictureListComments,
    bigPictureSocialComment, miniatureTemplate, miniaturePictures, bigPictureShowMoreComments, bigPictureCountComment
};
