var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');
const UserController = require('../controllers/user.js');

var userController = new UserController(userModel);

router.get('/login', function(req, res) {
    userController.login(req.body, (err, doc) => {
        if(err) {
            console.log(err);
            res.send(401).end();
        }

        if(!doc) {
            console.log(err);
            res.send(401).end();
        }

        res.redirect("/admin.html");
    });
});

router.get('/create', function(req, res) {
    userController.createUser(req.body, (err, docs) => {
        if(err) {
            console.log(err);
            res.status(400).end();
        }

        res.redirect("/admin.html");
    });
});


module.exports = router;