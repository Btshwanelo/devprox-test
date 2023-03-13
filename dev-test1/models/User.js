const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  idNo: {
    type: Number,
  },
  dateOfBirth: {
    type: String,
  },

})

module.exports = mongoose.model('User', UserSchema)
