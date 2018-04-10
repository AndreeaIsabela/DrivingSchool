var express = require('express');
var instructorController = require('../controllers/instructor_controller')

var router = express.Router();

/* GET instructors listing. */
router.get('/instructors', instructorController.getInstructors);

module.exports = router;
