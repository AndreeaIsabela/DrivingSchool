var express = require('express');
var router = express.Router();
const LogInController = require('../controllers/logIn.js');

var LogInControllerIns = new LogInController();


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
      const isPasswordValid = req.body.password === user.password;
      if (!isPasswordValid) {
        console.log(`Parola ${user.password} este incorecta pentru adresa ${user.email} `);
        res.status(404).end();
      }

      const userJson = user.toJSON();
      console.log(userJson);
      res.send(userJson);
      res.status(200).end();
    } catch (err) {
      res.status(500).send({
        error: "Error stuff"
      })
    }

  });

  LogInControllerIns.jwtSignUser(user,(err,signUser)=>{
    console.log(user);
    if (err) {
      console.log(err);
      res.status(500).end();
    }
  });

});

module.exports = router;
