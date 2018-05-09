class DrivingLessonController {

    constructor(drivingLessonModel) {
        this.drivingLessons = drivingLessonModel;
      }

      getDrivingLessons(done) {
        this.drivingLessons.find({}, done);
      }

      addDrivingLesson(drivingLesson, done) {
        let newDrivingLesson = new this.drivingLessons(drivingLesson);
        newDrivingLesson.save(done);
      }
    
      deleteDrivingLesson(cnp, done) {
       
        this.drivingLessons.find({cnp: cnp}).remove()
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

module.exports = new DrivingLessonController();