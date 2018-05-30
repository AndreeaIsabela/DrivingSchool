class DrivingLessonController {

    constructor(drivingLessonModel) {
        this.drivingLessons = drivingLessonModel;
    }

    getDrivingLessons(done) {
        this.drivingLessons.find({}, done);
    }

    addDrivingLesson(drivingLesson, done) {
        let newDrivingLesson = new this.drivingLessons(drivingLesson);
        newDrivingLesson.save(done);
    }

    deleteDrivingLesson(id, done) {

        this.drivingLessons.find({ _id: id }).remove()
            .exec(done);
    }
}

module.exports = DrivingLessonController;