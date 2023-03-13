const express = require('express')
const router = express.Router()

const {
  createUser,
  getUsers,
} = require('../controllers/users')

router.route('/').post(createUser).get(getUsers)

module.exports = router
