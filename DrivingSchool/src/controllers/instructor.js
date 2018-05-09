class InstructorController {

    constructor(instructorModel) {
        this.instructors = instructorModel;
      }

      getInstructors(done) {
        this.instructors.find({}, done);
      }

      addInstructor(instructor, done) {
        let newInstructor = new this.instructors(instructor);
        newInstructor.save(done);
      }
    
      deleteInstructor(id, done) {
       
        this.instructors.find({id: id}).remove()
        .exec(done);
      }



   /* getInstructors() {
        return [
            {
                email: 'ion@gmail.com',
                password: 'parola',
                lastName: 'Ionescu',
                firstName: 'Ion',
                authorization: '744',
                carNumber: 'DJ 05 AAA',
                phone: '0755110011'
            },
            {
                email: 'ion@gmail.com',
                password: 'parola',
                lastName: 'Ionescu',
                firstName: 'Ion',
                authorization: '744',
                carNumber: 'DJ 05 AAA',
                phone: '0755110011'
            },
            {
                email: 'ion@gmail.com',
                password: 'parola',
                lastName: 'Ionescu',
                firstName: 'Ion',
                authorization: '744',
                carNumber: 'DJ 05 AAA',
                phone: '0755110011'
            },
            {
                email: 'ion@gmail.com',
                password: 'parola',
                lastName: 'Ionescu',
                firstName: 'Ion',
                authorization: '744',
                carNumber: 'DJ 05 AAA',
                phone: '0755110011'
            }
        ];
    }*/
}

module.exports = InstructorController;