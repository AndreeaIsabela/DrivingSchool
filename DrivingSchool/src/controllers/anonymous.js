class AnonymousController {

    constructor(instructorModel) {
        this.instructorModel = instructorModel;
    }

    getInstructors(done) {
        this.instructorModel.find({}).select('firstName familyName').exec(done);
    }
}

module.exports = AnonymousController;