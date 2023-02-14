/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// window.addEventListener('beforeunload', function (event) {
//   var formJSON = JSON.stringify(data);
//   localStorage.setItem('javascript-local-storage', formJSON);
// });

var dataInJSON = localStorage.getItem('javascript-local-storage');
if (dataInJSON !== null) {
  data = JSON.parse(dataInJSON);
}
