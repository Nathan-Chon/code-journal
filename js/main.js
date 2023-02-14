var $photoUrl = document.querySelector('#photo-url');
var $previewImage = document.querySelector('.preview-image');

$photoUrl.addEventListener('input', function (event) {
  $previewImage.setAttribute('src', event.target.value);
});

var $journalForm = document.querySelector('.code-journal-form');
$journalForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var info = {};
  info.name = $journalForm.elements.name.value;
  info.url = $journalForm.elements.url.value;
  info.message = $journalForm.elements.message.value;

  info.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(info);
  $journalForm.reset();
  $previewImage.setAttribute('src', 'images/placeholder-image-square.jpg');
});
