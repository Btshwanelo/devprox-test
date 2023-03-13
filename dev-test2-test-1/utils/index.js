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

//get random array item
function getRandomFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

//get age from date of birth
function getAge(dateString) {
  const today = new Date();
  const parts = dateString.split('/');
  const year = parseInt(parts[2], 10);

  let age = today.getFullYear() - year;
  return age;
}

module.exports = {
  getRandomDateOfBirth,
  compareRows,
  getRandomFromArray,
  getRandomFromArray,
  getAge,
};
