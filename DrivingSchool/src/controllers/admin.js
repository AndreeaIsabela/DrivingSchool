class AdminController {

    constructor(adminModel) {
        this.admins = adminModel;
      }

      getAdmins(done) {
        this.admins.find({}, done);
      }

      addAdmin(admin, done) {
        let newAdmin = new this.admins(admin);
        newAdmin.save(done);
      }
    
      deleteAdmin(cnp, done) {
       
        this.admins.find({cnp: cnp}).remove()
        .exec(done);
      }


   /* getAdmins() {
        return [
            {
                name: 'Drogon'
            },
            {
                name: 'Jon Snow'
            },
            {
                name: 'Khaleesi'
            }
        ];
    }
*/
   
}

module.exports = new AdminController();