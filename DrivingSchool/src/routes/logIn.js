var express = require('express');
var router = express.Router();
const LogInController = require('../controllers/logIn.js');

var LogInControllerIns = new LogInController();

var userJson;
var userToken;
var loggedUser;
router.post('/', function (req, res, next) {


  LogInControllerIns.isUser(req.body.email, (err, user) => {
    
    console.log(user);
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    if (!user) {
      console.log("User doesn't exist");
      res.status(404).end();
    }
    try {
      const isPasswordValid = user.comparePassword(req.body.password);
      if (!isPasswordValid) {
        console.log(`Parola ${user.password} este incorecta pentru adresa ${user.email} `);
        res.status(404).end();
      }
      userJson = user.toJSON();
      res.send({
        user: userJson,
        token: LogInControllerIns.jwtSignUser(userJson)
      });
      res.status(200).end();

      console.log(userJson);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "Error stuff"
      })
    }

  });


});

module.exports = router;
