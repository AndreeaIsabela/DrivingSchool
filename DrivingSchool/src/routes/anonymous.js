const Router = require('express').Router;
const AnonymousController = require('../controllers/anonymous');
let instructorModel = require('../models/instructor');
var anonymousRouter = new Router();

// injecting the admin model in the controller instance
var anonymousController = new AnonymousController(instructorModel);

anonymousRouter.get('/instructors', (req, res) => {
  anonymousController.getInstructors((err, instructors) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(instructors);
  });
});

module.exports = anonymousRouter;