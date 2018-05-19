class InstructorController {

    constructor(instructorModel) {
        this.instructors = instructorModel;
    }

    getInstructors(done) {
        this.instructors.find({}, done);
    }

    getInstructor(id, done) {
        this.instructors.findById(id, done);
    }

    updateInstructor(id, instructor, done) {
        this.instructors.findOneAndUpdate({ _id: id }, instructor, { new: true }, done);
    }

    addInstructor(instructor, done) {
        let newInstructor = new this.instructors(instructor);
        newInstructor.save(done);
    }

    deleteInstructor(id, done) {

        this.instructors.find({ id: id }).remove()
            .exec(done);
    }
}

module.exports = InstructorController;