const Router = require('express').Router;
const InstructorController = require('../controllers/instructor');
let instructorModel = require('../models/instructor');
var instructorRoutes = new Router();

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

instructorRoutes.delete('/:id', (req, res) => {
  instructorControllerIns.deleteAdmin(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(204).end();
  });
});

module.exports = instructorRoutes;