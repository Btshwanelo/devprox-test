const url = '/api/v1/users';

//Dom elements
const nameDom = document.getElementById('name');
const surnameDom = document.getElementById('surname');
const idNoDom = document.getElementById('idNo');
const dateDom = document.getElementById('date');

//cancel form function
const cancelForm = () => {
  window.location.reload();
};

const submitForm = (e) => {
  e.preventDefault();

  //convert date format
  const [year, month, day] = dateDom.value.split('-');
  const newDateStr = `${day}/${month}/${year}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameDom.value,
      surname: surnameDom.value,
      idNo: parseInt(idNoDom.value),
      dateOfBirth: newDateStr,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // handle success and failure
      if (data.msg !== 'success') {
        alert(data.msg);
        nameDom.value = nameDom.value;
        surnameDom.value = surnameDom.value;
        idNoDom.value = idNoDom.value;
        dateDom.value = dateDom.value;
      } else {
        alert('Successfully added user to database');
        cancelForm();
      }
    })
    .catch((e) => console.log(e));
};

//handle form submit
document.getElementById('upload_form').addEventListener('submit', submitForm);
