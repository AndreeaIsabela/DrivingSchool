const express = require('express');
const registryController = require('../controllers/register')
const studentController = require('../controllers/student')
const instructorController = require('../controllers/instructor')
const adminController = require('../controllers/admin')

const router = express.Router();

/* GET student listing. */
router.get('/registerrequests', (req, res, next) => {
    let requests = registryController.getRequests();
    res.json(requests);
});

/* GET student listing. */
router.get('/students', (req, res, next) => {
    let students = studentController.getStudents();
    res.json(students);
});

/* GET instructors listing. */
router.get('/instructors', (req, res, next) => {
    let instructors = instructorController.getInstructor();
    res.json(instructors);
});

/* GET instructors listing. */
router.get('/admins', (req, res, next) => {
    let admins = adminController.getAdmins();
    res.json(admins);
});

module.exports = router;
