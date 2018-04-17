Vue.prototype.$http = axios;


let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            schedule: 0,
            student: 1,
        },
        viewInfo: [
            {
                title: 'Schedule',
                descriptors: [
                    { text: 'CNP', width: 10 },
                    { text: 'Nume', width: 30 },
                    { text: 'Prenume', width: 30 },
                    { text: 'Categorie', width: 10 },
                    { text: 'Numar telefon', width: 20 }
                ]
            }, 
            {
                title: 'Cursanti',
                descriptors: [
                    { text: 'CNP', width: 10 },
                    { text: 'Nume', width: 30 },
                    { text: 'Prenume', width: 30 },
                    { text: 'Categorie', width: 10 },
                    { text: 'Numar telefon', width: 20 }
                ]
            }
        ],
        currentView: 0,
        data: []
    },
    methods: {
        onStudents: function () {
            this.$http
                .get('/api/students')
                .then(response => {
                    this.enableView(this.viewIndex.student);
                    this.clearTable();

                    for (let student of response.data) {
                        this.data.push([
                            student.lastName + ' ' + student.firstName,
                            student.cnp,
                            student.category,
                            student.phone
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onSchedule: function () {
            this.$http
                .get('/api/students')
                .then(response => {
                    this.enableView(this.viewIndex.student);
                    this.clearTable();

                    for (let student of response.data) {
                        this.data.push([
                            student.lastName + ' ' + student.firstName,
                            student.cnp,
                            student.category,
                            student.phone
                        ]);
                    };
                    console.log(this.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        enableView: function (viewIndex) {
            this.currentView = viewIndex;
        },
        clearTable() {
            this.data.splice(0, this.data.length);
        },


    }







})