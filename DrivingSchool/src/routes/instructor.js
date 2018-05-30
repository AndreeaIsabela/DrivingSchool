const Router = require('express').Router;
const InstructorController = require('../controllers/instructor');
let instructorModel = require('../models/instructor');
var instructorRoutes = new Router();

var studentModel = require('../models/student.js');


const studentController = require('../controllers/student')
const studentControllerIns = new studentController(studentModel);


var drivingLessonModel = require('../models/drivingLessons.js');
const drivingLessonController = require('../controllers/drivingLesson')
const drivingLessonControllerIns = new drivingLessonController(drivingLessonModel);

// injecting the admin model in the controller instance
var instructorControllerIns = new InstructorController(instructorModel);

instructorRoutes.get('/', (req, res) => {
  instructorControllerIns.getInstructors((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  });
});

instructorRoutes.post('/', (req, res) => {
  instructorControllerIns.addInstructor(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});

instructorRoutes.get('/students', (req, res, next) => {
   studentControllerIns.getStudents((err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      console.log(result);
      res.json(result);
    });
});
instructorRoutes.get('/drivingLesson', (req, res, next) => {
  drivingLessonControllerIns.getDrivingLessons( (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result); 
    res.json(result);
  });
    });
instructorRoutes.post('/drivingLesson', (req, res) => {
  drivingLessonControllerIns.addDrivingLesson(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});
instructorRoutes.delete('/drivingLesson/:id', (req, res) => {
  drivingLessonControllerIns.deleteDrivingLesson(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});

instructorRoutes.get('/:id', (req, res) => {
  instructorControllerIns.getInstructor(req.params.id, (err, doc) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    if(!doc) {
      return res.status(404).end();
    }
    res.json(doc);
  });
});

instructorRoutes.put('/:id', (req, res) => {
  instructorControllerIns.updateInstructor(req.params.id, req.body, (err, doc) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    if(!doc) {
      return res.status(404).end();
    }
    res.json(doc);
  });
});

instructorRoutes.delete('/:id', (req, res) => {
  instructorControllerIns.deleteInstructor(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(204).end();
  });
});

module.exports = instructorRoutes;