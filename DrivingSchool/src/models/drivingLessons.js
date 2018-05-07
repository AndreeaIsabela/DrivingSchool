const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DrivingLessonsSchema = new Schema(
  {
    student:{type: Schema.ObjectId, ref: 'Student'},
    instructor:{type: Schema.ObjectId, ref: 'Instructor'},
    date: {type: Date},
    place: { type: String, required: true, max: 200 }, 
  }
);



//Export model
module.exports = mongoose.model('DrivingLessons', DrivingLessonsSchema);