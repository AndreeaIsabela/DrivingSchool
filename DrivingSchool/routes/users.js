var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');
const UserController = require('../controllers/user.js');

const userController = new UserController(userModel);

/* GET users listing. */
router.get('/', function(req, res) {
  userController.getUsers().then((users) => {
    res.json(users);
  }).catch(err => {
    res.status(400).write(err);
  });
});

router.post('/', (req, res) => {
  userController.createUser(req.body).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    res.status(400).write(err);
  })
})

module.exports = router;
