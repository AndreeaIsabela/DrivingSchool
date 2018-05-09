
class StudentController {
    constructor(studentModel) {
        this.student = studentModel;
    }

    getStudents(done) {
        this.student.find({}).exec(done);
    }
    getStudent(id, done) {
        this.student.findById(id, done);
    }
    getArchivedStudents(done) {
        this.student.find({ archived: true }).exec(done);
    }
    archiveStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id },
            { $set: { archived: true } },
            { new: true }, done);
    }
    unarchiveStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id }, 
            { $set: { archived: false } }, 
            { new: true }, done);
    }
    updateStudent(id, student, done) {
        this.student.findOneAndUpdate({ _id: id }, student, { new: true }, done);
    }
    deleteStudent(id, done) {
        this.student.findByIdAndRemove(id, done);
    }
}

module.exports = StudentController;