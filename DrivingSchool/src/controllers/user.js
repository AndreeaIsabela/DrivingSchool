class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getUsers() {
        var self = this;
        return this.userModel.find();
    }
    createUser(user) {
        var userIns = new this.userModel();
        userIns.email = user.email;
        userIns.name = user.name;
        return userIns.save();
    }
}

module.exports = UserController;