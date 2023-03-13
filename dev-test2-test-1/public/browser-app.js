const url = '/api/v1/files'

const generateData=(e)=>{
  e.preventDefault()
  const input = document.getElementById('num-variation');

  const formData= input.value

  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({'numOfVariation': parseInt(formData)})
  }).then(res => res.json())
  .then(data => {
    if(data.duplicateCount !== 0){
      alert('Data generated contains duplicated filed, please generate data again')
      window.location.reload();
    } else {
      alert("Data successfully generated and stored in the database")
      window.location.reload();
    }

  })
  .catch((e)=>console.log(e))
}

document.getElementById('input-form').addEventListener('submit',generateData)