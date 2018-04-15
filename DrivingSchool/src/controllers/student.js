class StudentController {
    getStudents() {
        return [
            {
                cnp: '1900909095000',
                lastName: 'Georgescu',
                firstName: 'Andrei',
                category: 'B',
                phone: '0755110011'
            },
            {
                cnp: '1900909095000',
                lastName: 'Georgescu',
                firstName: 'Andrei',
                category: 'B',
                phone: '0755110011'
            },
            {
                cnp: '1900909095000',
                lastName: 'Georgescu',
                firstName: 'Andrei',
                category: 'B',
                phone: '0755110011'
            },
            {
                cnp: '1900909095000',
                lastName: 'Georgescu',
                firstName: 'Andrei',
                category: 'B',
                phone: '0755110011'
            }
        ];
    }
}

module.exports = new StudentController();