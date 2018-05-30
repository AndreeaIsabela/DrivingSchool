const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DrivingLessonsSchema = new Schema(
  {
    studentName:{type: String},
    teacherName:{type: String},
    date: {type: Date},
    time:{type:String},
    location: { type: String, required: true, max: 200 }, 
  }
);



//Export model
module.exports = mongoose.model('DrivingLessons', DrivingLessonsSchema);