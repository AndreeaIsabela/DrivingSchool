const Promise=require('bluebird');
const bcrypt=Promise.promisifyAll(require('bcrypt'))
class AdminController {

    constructor(adminModel) {
        this.adminModel = adminModel;
    }

    getAdmins(done) {
        this.adminModel.find({}, done);
    }
    hashPassword(user){

        const SALT_FACTOR=8;
      
        return bcrypt
           .getSaltAsync(SALT_FACTOR)
           .then(salt=> bcrypt.hashAsync(user.password,salt,null))
           .then(hash=>{
             user.setDataValue('password',hash)
           })
      }
    createAdmin(admin, done) {
        this.hashPassword(admin.password);
        let newAdmin = new this.adminModel(admin);
        newAdmin.save(done);
    }

    deleteAdmin(cnp, done) {

        this.adminModel.find({ cnp: cnp }).remove()
            .exec(done);
    }
}

module.exports = AdminController;