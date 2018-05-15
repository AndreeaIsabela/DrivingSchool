const studentState = require('../models/studentState');

class StudentController {
    constructor(studentModel) {
        this.student = studentModel;
    }

    getStudents(done) {
        this.student.find({ state: studentState.registered }).exec(done);
    }
    getStudent(id, done) {
        this.student.findById(id, done);
    }
    getArchivedStudents(done) {
        this.student.find({ state: studentState.archived }).exec(done);
    }
    getStudentRequests(done) {
        this.student.find({ state: studentState.unregistered }).exec(done);
    }
    archiveStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id },
            { $set: { state: studentState.archived } },
            { new: true }, done);
    }
    unarchiveStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id }, 
            { $set: { state: studentState.registered } }, 
            { new: true }, done);
    }
    registerStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id }, 
            { $set: { state: studentState.registered } }, done);
    }
    updateStudent(id, student, done) {
        this.student.findOneAndUpdate({ _id: id }, student, { new: true }, done);
    }
    deleteStudent(id, done) {
        this.student.findByIdAndRemove(id, done);
    }
    createRegisterRequest(body, done) {
        body.state = studentState.unregistered;
        let request = new this.student(body);
        request.save(done);
    }
}

module.exports = StudentController;