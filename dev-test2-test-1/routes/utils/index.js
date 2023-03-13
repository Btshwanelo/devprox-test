//get random array item
function getRandomFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

//compare objects
function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

//compare rows
function compareRows(rows) {
  const duplicates = [];
  rows.forEach((row1, index1) => {
    rows.forEach((row2, index2) => {
      if (index1 !== index2 && compareObjects(row1, row2)) {
        duplicates.push(row1);
      }
    });
  });
  return duplicates;
}

//get random date of birth
function getRandomDateOfBirth() {
  const now = new Date();
  const minAge = 18;
  const maxAge = 60;
  const year = now.getFullYear() - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
  const month = Math.floor(Math.random() * 12) + 1;
  const daysInMonth = new Date(year, month, 0).getDate(); // get number of days in month
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  const dateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  return dateString;
}

//get age from date of birth
function getAge(dateString) {
  const today = new Date();
  const parts = dateString.split('/');
  const year = parseInt(parts[2], 10);

  let age = today.getFullYear() - year;
  return age;
}

module.export = {
  getRandomFromArray,
  compareObjects,
  compareRows,
  getRandomDateOfBirth,
  getAge,
};
