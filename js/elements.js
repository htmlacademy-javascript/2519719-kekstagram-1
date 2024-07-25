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
const shownCommentCount = bigPictureCountComment.querySelector('.shown-comments-count');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const formCancelButton = document.getElementById('upload-cancel');
const scaleControl = document.querySelector('.scale__control--value');
const uploadFile = document.querySelector('#upload-file');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelector('.effects__radio');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const radioButtons = document.querySelectorAll('.effects__radio');
const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');
const body = document.querySelector('body');
const submitButton = document.querySelector('.img-upload__submit');

export {
  bigPicture, bigPictureButtonCancel, bigPictureImg, bigPictureLikes, bigPictureComments, bigPictureDescription, bigPictureListComments,
  bigPictureSocialComment, miniatureTemplate, miniaturePictures, bigPictureShowMoreComments, bigPictureCountComment, shownCommentCount,
  uploadOverlay, formCancelButton, scaleControl, uploadFile, effectLevelValue, effectsRadio, textDescription, textHashtags, form, uploadInput, preview,
  effectLevel, sliderElement, valueElement, radioButtons, buttonControlSmaller, buttonControlBigger, body, submitButton
};
