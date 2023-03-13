const url = '/api/v1/records';

//dom element
const containerDom = document.getElementById('container');
const inputDom = document.getElementById('fileinput');

//on load run get data count of the records and populate the dom
window.onload = function (e) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      containerDom.innerHTML = `<h4> there are ${data.count} imported records</h4>`;
    })
    .catch((e) => console.log(e));
};

//generate csv file
const generateCSV = (e) => {
  e.preventDefault();
  var formData = new FormData();

  formData.append('file', inputDom.files[0]);

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      alert('CSV uploaded successfully');
      // clear form
      window.location.reload();
    })
    .catch((e) => console.log(e));
};

document.getElementById('upload_form').addEventListener('submit', generateCSV);
