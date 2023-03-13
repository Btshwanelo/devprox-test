const fs = require('fs');
const csv = require('csv-parser');
const { names, surnames } = require('../constants/data');
const { getRandomDateOfBirth, compareRows, getRandomFromArray, getAge } = require('../utils');

const createFile = async (req, res) => {
  const { numOfVariation } = req.body;

  const writeStream = fs.createWriteStream('output/output.csv');

  writeStream.write(`"Id","Name", "Surname","Initials", "Age", "DateOfBirth" \n`);

  //write data to csv file
  for (let i = 1; i < numOfVariation + 1; i++) {
    const dateOfBirth = getRandomDateOfBirth();
    const name = getRandomFromArray(names);
    const surname = getRandomFromArray(surnames);
    const initials = name[0];
    const age = getAge(dateOfBirth);

    const overWatermark = writeStream.write(`${i},"${name}","${surname}", "${initials}", ${age},${dateOfBirth} \n`);

    if (!overWatermark) {
      await new Promise((resolve) => writeStream.once('drain', resolve));
    }
  }

  //end writeStream
  writeStream.end();

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

      res.status(200).json({ msg: 'success', duplicateCount: duplicates.length });
    });
};

module.exports = {
  createFile,
};
