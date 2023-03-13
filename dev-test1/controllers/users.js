const User = require('../models/User')

const createUser = async (req, res) => {
  const {name, surname, idNo, dateOfBirth} = req.body

  const specialCharacterRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const user = await User.findOne({ idNo })

  if(user){
   return res.status(201).json( {msg: `User with ${idNo} already exist`})
  }

  if(!name){
    return res.status(201).json({ msg: `Please provide name`})
  }

  if(!specialCharacterRegex.test(name)){
    return res.status(201).json({ msg:`Please provide valid name with no special characters`})
  }

  if(!surname){
    return res.status(201).json({ msg:`Please provide surname`})
  }

  if(!specialCharacterRegex.test(surname)){
    return res.status(201).json({ msg: `Please provide valid surname with no special characters`})
  }

  const dateRegex = /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
  // Test if the input matches the date format
  if (!dateRegex.test(dateOfBirth)) {
    return res.status(201).json({ msg: `Date format must be dd/mm/YYYY`})
  }

  if(idNo?.toString().length !== 13){
    return res.status(201).json({msg: `Invalid Id \n Id number must be 13 characters`, user: {name, surname, idNo, dateOfBirth} })
  }

  const newUser = await User.create(req.body);
  res.status(200).json({ msg: 'success', newUser });
};

const getUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({ users, count: users.length})
};

module.exports = {
  createUser,
  getUsers
}
