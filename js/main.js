var photoUrl = document.querySelector('#photo-url');
var previewImage = document.querySelector('.preview-image');
photoUrl.addEventListener('input', function (event) {
  previewImage.setAttribute('src', event.target.value);
});
