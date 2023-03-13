const fs = require('fs');
const csv = require('csv-parser');
const { names, surnames } = require('../constants/data');

const createFile = async (req, res) => {
  const {numOfVariation } = req.body
  
  const writeStream = fs.createWriteStream('output/output.csv');
  
  writeStream.write(`"Id","Name", "Surname","Initials", "Age", "DateOfBirth" \n`);
  
    function getAge(dateString) {
      const today = new Date();
      const parts = dateString.split('/');
      const year = parseInt(parts[2], 10);

      let age = today.getFullYear() - year;
      return age;
    }

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

    function getRandomFromArray(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }


    for( let i = 1; i <numOfVariation+1; i++){

      const dateOfBirth = getRandomDateOfBirth();
      const name = getRandomFromArray(names);
      const surname = getRandomFromArray(surnames);
      const initials = name[0];
      const age = getAge(dateOfBirth);


      const overWatermark = writeStream.write(`${i},"${name}","${surname}", "${initials}", ${age},${dateOfBirth} \n`);

      if(!overWatermark){
        await new Promise((resolve) => 
        writeStream.once('drain', resolve)
        );
      }
    }
    
    writeStream.end()


  // check for duplicates

  const rows = [];
  fs.createReadStream('output/output.csv')
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', () => {
  
      // Compare the rows using a JavaScript function
      const duplicates = compareRows(rows);
      console.log("duplicates", duplicates);
    
      res.status(200).json({ msg: 'success', duplicateCount: duplicates.length});
      
    });
};

module.exports = {
  createFile,
}