const express = require('express')
const router = express.Router()

const {
  createFile,
} = require('../controllers/files')

router.route('/').post(createFile)

module.exports = router