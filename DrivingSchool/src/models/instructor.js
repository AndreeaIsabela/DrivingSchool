var mongoose = require('mongoose');
const Promise=require('bluebird');
const bcrypt=Promise.promisifyAll(require('bcrypt'))

var Schema = mongoose.Schema;

var InstructorSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: function (email) {
          var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailReg.test(email);
        },
        message: 'not a valid email'
      },
      required: [true, 'User email required']
    },
    firstName: { type: String, required: true, max: 100 },
    familyName: { type: String, required: true, max: 100 },
    students: [{ type: Schema.ObjectId, ref: 'Student' },],
    carNumber: { type: String, required: true },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!'
      },
    },
    password: { type: String, required: true },
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);


const User=mongoose.model('Instructor', InstructorSchema);

User.prototype.comparePassword=function(password){
    return bcrypt.compareAsync(password,this.password)
}

//Export model
module.exports = User;
