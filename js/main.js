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

  document.addEventListener('DOMContentLoaded', function (event) {
    for (var i = 0; i < data.entries.length; i++) {
      $unorderedList.appendChild(renderEntry(data.entries[i]));
    }
  });
  toggleNoEntries();
  viewSwap('entries');
});

function renderEntry(entry) {
  var $list = document.createElement('li');
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $list.appendChild($row);
  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);
  var $newImage = document.createElement('img');
  $newImage.setAttribute('class', 'new-image');
  $newImage.setAttribute('src', entry.url);
  $columnHalf.appendChild($newImage);
  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf2);
  var $newTitle = document.createElement('h2');
  $newTitle.setAttribute('class', 'new-title');
  $columnHalf2.appendChild($newTitle);
  $newTitle.textContent = entry.name;
  var $newP = document.createElement('p');
  $newP.setAttribute('class', 'new-p');
  $columnHalf2.appendChild($newP);
  $newP.textContent = entry.message;
  return $list;
}
var $unorderedList = document.querySelector('.list');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $unorderedList.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
});

var $nothingNew = document.querySelector('.nothing-new');
function toggleNoEntries() {
  if (data.entries.length === 0) {
    $nothingNew.classList.remove('hidden');
  } else {
    $nothingNew.classList.add('hidden');
  }
}

var $navLink = document.querySelector('.nav-link');
var $view = document.querySelectorAll('.view');
function viewSwap(screenChange) {
  data.view = screenChange;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === screenChange) {
      $view[i].classList.remove('hidden');
    } else {
      $view[i].classList.add('hidden');
    }
  }
}
$navLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

var $newButton = document.querySelector('.new-button');
$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
