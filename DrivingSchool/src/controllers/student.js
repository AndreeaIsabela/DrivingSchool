class StudentController {
    getStudents() {
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
    }
    getArchivedStudents() {
        return this.getStudents();
    }
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
    }
}

module.exports = new StudentController();