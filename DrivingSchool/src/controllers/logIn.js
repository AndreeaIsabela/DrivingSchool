let adminModel = require('../models/admin');
let studentModel = require('../models/student');
let instructorModel = require('../models/instructor');


class LogInController {
    async isUser(email, done) {

        let admin = 0;
        await adminModel.count({ 'email': email }, function(err, c){
            admin = c;
        });

        let instructor = 0;
        await instructorModel.count({ 'email': email }, function(err, c){
            instructor = c;
        });
        let student = 0;
        await studentModel.count({ 'email': email }, function(err, c){
            student = c;
        });
       
       
        console.log(admin);
        console.log(instructor);
        console.log(student);

        if (admin) {
            adminModel.findOne({ "email": email }, done);
            
        }
        if (student) {
            studentModel.findOne({ "email": email }, done);
            
            
        }
        if (instructor) {
            instructorModel.findOne({ "email": email }, done);
        }
    }


}

module.exports = LogInController;