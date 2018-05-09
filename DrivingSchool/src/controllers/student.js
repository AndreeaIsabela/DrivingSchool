
class StudentController {
    constructor(studentModel) {
        this.students = studentModel;
      }

      getStudents(done) {
        this.students.find({}, done);
      }
   /* getStudents (){
        return [
            {
                lastName: 'Georgescu',
                firstName: 'Andrei',
                motherFirstName: 'Ioana',
                fatherFirstName: 'Ion',
                region: 'Dolj',
                city: 'Craiova',
                address: 'Strada AI Cuza, Bloc B, Sc. 4, Et. 1, Ap. 3 ',
                cnp: '1900909095000',
                idSeries: 'DZ',
                idNumber: '2000',
                dateOfBirth: '2017-07-04',
                gender: 'male',
                marriageStatus: 'married',
                phone: '0722222222',
                email: 'student@google.com',
                password: 'password'
            },
            {
                lastName: 'Georgescu',
                firstName: 'Andrei',
                motherFirstName: 'Ioana',
                fatherFirstName: 'Ion',
                region: 'Dolj',
                city: 'Craiova',
                address: 'Strada AI Cuza, Bloc B, Sc. 4, Et. 1, Ap. 3 ',
                cnp: '1900909095000',
                idSeries: 'DZ',
                idNumber: '2000',
                dateOfBirth: '2017-07-04',
                gender: 'male',
                marriageStatus: 'married',
                phone: '0722222222',
                email: 'student@google.com',
                password: 'password'
            },
            {
                lastName: 'Georgescu',
                firstName: 'Andrei',
                motherFirstName: 'Ioana',
                fatherFirstName: 'Ion',
                region: 'Dolj',
                city: 'Craiova',
                address: 'Strada AI Cuza, Bloc B, Sc. 4, Et. 1, Ap. 3 ',
                cnp: '1900909095000',
                idSeries: 'DZ',
                idNumber: '2000',
                dateOfBirth: '2017-07-04',
                gender: 'male',
                marriageStatus: 'married',
                phone: '0722222222',
                email: 'student@google.com',
                password: 'password'
            },
            {
                lastName: 'Georgescu',
                firstName: 'Andrei',
                motherFirstName: 'Ioana',
                fatherFirstName: 'Ion',
                region: 'Dolj',
                city: 'Craiova',
                address: 'Strada AI Cuza, Bloc B, Sc. 4, Et. 1, Ap. 3 ',
                cnp: '1900909095000',
                idSeries: 'DZ',
                idNumber: '2000',
                dateOfBirth: '2017-07-04',
                gender: 'male',
                marriageStatus: 'married',
                phone: '0722222222',
                email: 'student@google.com',
                password: 'password'
            }
        ];
    }*/
    getArchivedStudents(done) {
        return this.getStudents(done);
    }
    /*
    getScheduleForStudent(id) {
        return [
            {
                date: '22/03/2018',
                hour: '10:30',
                location: 'Restaurant Minerva'
            },
            {
                date: '22/03/2018',
                hour: '10:30',
                location: 'Restaurant Minerva'
            },
            {
                date: '22/03/2018',
                hour: '10:30',
                location: 'Restaurant Minerva'
            },
            {
                date: '22/03/2018',
                hour: '10:30',
                location: 'Restaurant Minerva'
            }
        ];
    }*/
    addStudent(student, done) {
        let newStudent = new this.students(student);
        newStudent.save(done);
      }
    
      deleteStudent(cnp, done) {
       
        this.students.find({cnp: cnp}).remove()
        .exec(done);
      }
}

module.exports = StudentController;