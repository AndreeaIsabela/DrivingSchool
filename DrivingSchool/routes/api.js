var express = require('express');
var instructorController = require('../controllers/instructor')

var router = express.Router();

/* GET instructors listing. */
router.get('/instructors', (req, res, next) => {
    let instructors = instructorController.getInstructor();
    res.json(instructors);
});

module.exports = router;
