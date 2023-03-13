const Record = require('../models/record')
var csv = require('csvtojson');


const getAllRecords = async (req, res) => {
  const records = await Record.find({})
  res.status(200).json({ records, count: records.length })
}

const createRecord = async (req, res) => {
  const jsonObj = await csv().fromFile(req.file.path);
  console.log(jsonObj);
  const records = [];
  for(var i = 0;i<jsonObj.length;i++){
    var obj={};

    obj.id=jsonObj[i]['id'];
    obj.name=jsonObj[i]['name'];
    obj.surname=jsonObj[i]['surname'];
    obj.initials=jsonObj[i]['initials'];
    obj.age=jsonObj[i]['age'];
    obj.dateOfBirth=jsonObj[i]['dateOfBirth'];
    records.push(obj);
  }
  const newRecords = await Record.insertMany(records)
  res.status(200).json({ msg: 'success', newRecords })
}

module.exports = {
  getAllRecords,
  createRecord
}