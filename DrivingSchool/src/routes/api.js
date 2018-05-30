const express = require('express');
const registryController = require('../controllers/register')
const instructorController = require('../controllers/instructor')
const adminController = require('../controllers/admin')

var studentModel = require('../models/student.js');


const studentController = require('../controllers/student')
const studentControllerIns = new studentController(studentModel);
var drivingLessonModel = require('../models/drivingLessons.js');
const drivingLessonController = require('../controllers/drivingLesson')
const drivingLessonControllerIns = new drivingLessonController(drivingLessonModel);

const router = express.Router();

/* GET student listing. */
router.get('/registerrequests', (req, res, next) => {
    let requests = registryController.getRequests();
    res.json(requests);
});



/* GET student archive listing. */
router.get('/archive', (req, res, next) => {
    let students = studentController.getArchivedStudents();
    res.json(students);
});

/* GET instructors listing. */
router.get('/instructors', (req, res, next) => {
    let instructors = instructorController.getInstructors();
    res.json(instructors);
});

/* GET instructors listing. */
router.get('/admins', (req, res, next) => {
    let admins = adminController.getAdmins();
    res.json(admins);
});

module.exports = router;
