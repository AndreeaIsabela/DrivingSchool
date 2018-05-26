
class AdminController {

    constructor(adminModel) {
        this.adminModel = adminModel;
    }

    getAdmins(done) {
        this.adminModel.find({}, done);
    }
    
    createAdmin(admin, done) {
        let newAdmin = new this.adminModel(admin);
        newAdmin.save(done);
    }

    deleteAdmin(cnp, done) {

        this.adminModel.find({ cnp: cnp }).remove()
            .exec(done);
    }
}

module.exports = AdminController;