var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        email: {
            type: String, validate: {
                validator: function (email) {
                    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailReg.test(email);
                },
                message: 'not a valid email'
            },
            unique: true,
            required: [true, 'User email required']
        },
        password: { type: String, required: true, min: 7, max: 100 },
        userType: { type: String, required: true, enum: ["Admin", "Instructor", "Student"] }
    }
);

module.exports = mongoose.model('User', UserSchema);