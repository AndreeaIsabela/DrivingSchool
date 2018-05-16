class InstructorController {

    constructor(userModel) {
        this.userModel = userModel;
    }

    createUser(userData, done) {
        if(user.password != user.confirmPassword) {
            let err = new Error("Passwords do not match");
            done(err, null);
            return;
        }

        let user = new this.userModel(userData);
        user.save(done);
    }

    login(userData, done) {
        this.userModel.findOne({
            email: userData.email,
            password: userData.email.password
        }).exec(done);
    }
}

module.exports = InstructorController;