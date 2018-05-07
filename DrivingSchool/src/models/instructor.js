var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InstructorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
   
  }
);

// Virtual for instructor's full name
InstructorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});


//Export model
module.exports = mongoose.model('Instructor', InstructorSchema);