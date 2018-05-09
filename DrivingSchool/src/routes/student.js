var express = require('express');
var router = express.Router();
var studentModel = require('../models/student.js');
const StudentController = require('../controllers/student.js');

var studentController = new StudentController(studentModel);

router.get('/students', function(req, res) {
    studentController.getStudents((err, docs) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.json(docs);
    });
});

router.get('/students/archive', function(req, res) {
    studentController.getArchivedStudents((err, docs) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.json(docs);
    });
});

router.get('/students/:id', function(req, res) {
    studentController.getStudent((err, res) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(res);
    });
});

router.post('/students/:id/archive', function(req, res) {
    studentController.archiveStudent((err, res) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(res);
    });
});

router.post('/students/:id/unarchive', function(req, res) {
    studentController.unarchiveStudent((err, res) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(res);
    });
});

router.put('/students/:id', function(req, res) {
    studentController.updateStudent((err, res) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(res);
    });
});

router.delete('/students/:id', function(req, res) {
    studentController.deleteStudent((err, doc) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!doc) {
            res.status(404).end();
        }
        res.send(204).end();
    });
});

module.exports = router;