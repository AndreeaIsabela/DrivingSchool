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

router.post('/register', function(req, res) {
    studentController.createRegisterRequest(req.body, (err, registerRequest) => {
        if(err) {
            console.log(err);
            return res.status(400).end();
        }

        return res.status(201).json(registerRequest);
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
    studentController.getStudent(req.params.id, (err, student) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(student);
    });
});

router.post('/:id/archive', function(req, res) {
    studentController.archiveStudent(req.params.id, (err, student) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(student);
    });
});

router.post('/:id/unarchive', function(req, res) {
    studentController.unarchiveStudent(req.params.id, (err, student) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(student);
    });
});

router.post('/:id/accept', function(req, res) {
    studentController.registerStudent(req.params.id, (err, student) => {
        console.log("hello");
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(student);
    });
});

router.put('/:id', function(req, res) {
    studentController.updateStudent(req.params.id, (err, student) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!res) {
            res.status(404).end();
        }
        res.json(student);
    });
});

router.delete('/:id', function(req, res) {
    studentController.deleteStudent(req.params.id, (err, student) => {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        if(!student) {
            res.status(404).end();
        }
        res.status(204).send(student);
    });
});

module.exports = router;