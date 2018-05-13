var express = require('express');
var router = express.Router();
var studentModel = require('../models/student.js');
const StudentController = require('../controllers/student.js');

var studentController = new StudentController(studentModel);

router.get('/', function(req, res) {
    studentController.getStudents((err, docs) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.json(docs);
    });
});

router.get('/archive', function(req, res) {
    studentController.getArchivedStudents((err, docs) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.json(docs);
    });
});

router.get('/requests', function(req, res) {
    studentController.getStudentRequests((err, docs) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.json(docs);
    });
});

router.get('/:id', function(req, res) {
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

router.post('/:id/archive', function(req, res) {
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

router.post('/:id/unarchive', function(req, res) {
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

router.post('/:id/accept', function(req, res) {
    studentController.registerStudent((err, res) => {
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

router.put('/:id', function(req, res) {
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

router.delete('/:id', function(req, res) {
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