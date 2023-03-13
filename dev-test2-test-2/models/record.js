const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String,
  initials: String,
  age: String,
  dateOfBirth: String
})

module.exports = mongoose.model('Record', RecordSchema)