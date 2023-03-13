const express = require('express');
const router = express.Router();
var multer = require('multer');

var upload = multer({ dest: 'public/uploads/' });


const {getAllRecords, createRecord} = require('../controllers/records')

router.route('/').get(getAllRecords).post(upload.single('file'), createRecord)


module.exports = router