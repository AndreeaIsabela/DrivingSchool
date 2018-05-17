var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InstructorSchema = new Schema(
  {
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
    }
  }
);

//Export model
module.exports = mongoose.model('Instructor', InstructorSchema);