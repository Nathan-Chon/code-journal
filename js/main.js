var $photoUrl = document.querySelector('#photo-url');
var $previewImage = document.querySelector('.preview-image');
var $delete = document.querySelector('.delete');
var $cancel = document.querySelector('.cancel');

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
  if (event.target.matches('.submit')) {
    if (data.editing === null) {
      info.entryId = data.nextEntryId;
      data.nextEntryId++;
      data.entries.unshift(info);
      $list.prepend(renderEntry(data.entries[0]));
    } else {
      info.entryId = data.editing.entryId;

      for (var i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryId === info.entryId) {
          data.entries[i] = info;
        }
      }
      var updatedLi = renderEntry(info);
      const $lis = document.querySelectorAll('li');

      for (var j = 0; j < $lis.length; j++) {

        if (Number($lis[j].getAttribute('data-entry-id')) === data.editing.entryId) {
          var liToReplace = $lis[j];
        }
      }

      liToReplace.replaceWith(updatedLi);
      data.editing = null;
    }

    toggleNoEntries();
    viewSwap('entries');
    $previewImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    $journalForm.reset();
  } else if (event.target.matches('.delete')) {
    var $deleteFunction = document.querySelector('.delete-function');
    $deleteFunction.classList.remove('hidden');
    if (event.target.matches('.cancel')) {
      $deleteFunction.classList.add('hidden');
    } else if (event.target.matches('.confirm')) {
      $deleteFunction.classList.add('hidden');
    }
  }
});

function renderEntry(entry) {
  var $list = document.createElement('li');
  $list.setAttribute('data-entry-id', entry.entryId);
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
  var $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pen pen-adjustment');
  $columnHalf2.appendChild($pencilIcon);
  var $newP = document.createElement('p');
  $newP.setAttribute('class', 'new-p');
  $columnHalf2.appendChild($newP);
  $newP.textContent = entry.message;
  return $list;
}
var $list = document.querySelector('.list');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
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
  var $nEntry = document.querySelector('.n-entry');
  var $editEntry = document.querySelector('.edit-entry');
  $nEntry.setAttribute('class', 'n-entry');
  $editEntry.setAttribute('class', 'edit-entry hidden');
  $delete.classList.add('hidden');
});

$list.addEventListener('click', function (event) {
  if (event.target.matches('.pen-adjustment')) {
    viewSwap('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
        document.getElementById('photo-url').setAttribute('value', data.editing.url);
        document.getElementById('full-name').setAttribute('value', data.editing.name);
        document.getElementById('user-message').value = data.editing.message;
        $previewImage.src = data.editing.url;
      }
    }
    var $nEntry = document.querySelector('.n-entry');
    var $editEntry = document.querySelector('.edit-entry');
    $nEntry.setAttribute('class', 'n-entry hidden');
    $editEntry.setAttribute('class', ' edit-entry');
    $delete.classList.remove('hidden');
  }
});

$delete.addEventListener('click', function (event) {
  var $deleteFunction = document.querySelector('.delete-function');
  $deleteFunction.classList.remove('hidden');
});

$cancel.addEventListener('click', function (event) {
  var $deleteFunction = document.querySelector('.delete-function');
  $deleteFunction.classList.add('hidden');
});
