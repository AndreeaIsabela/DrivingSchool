Vue.prototype.$http = axios;



let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            student: 0,
            schedule: 1,
        },
        viewInfo: [

            {
                title: 'Cursanti',
                descriptors: [
                    { text: 'CNP' },
                    { text: 'Numar telefon' },
                ]
            }, {
                title: 'Schedule',
                descriptors: [
                    { text: 'Locatie', width: 10 },
                    { text: 'CNP', width: 30 },
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
                    this.clearList();

                    this.fullData = response.data;
                    for (let student of response.data) {
                        console.log(student);
                        this.data.push([
                            student.lastName + ' ' + student.firstName,
                            student.cnp,
                            student.phone
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err);
                });
        },
        onSchedule: function () {
            this.$http
                .get('/api/students/sss/schedule')
                .then(response => {
                    this.enableView(this.viewIndex.schedule);
                    this.clearList();

                    this.fullData = response.data;
                    for (let request of response.data) {
                        this.data.push([
                            
                            request.date + ' ' + request.hour,
                            request.location,
                            request.cnp

                        ]);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        enableView: function (viewIndex) {
            this.currentView = viewIndex;
        },
        onEdit: function (index) {
            this.formEnabled = true;

            this.formData = {};
            let propertyNames = Object.getOwnPropertyNames(this.fullData[index]);
            for (let propName of propertyNames) {
                this.formData[propName] = this.fullData[index][propName];
            }

            if (this.formData.password) {
                this.formData.confirmPassword = this.formData.password;
            }
        },
        onCreate: function () {
            this.formEnabled = true;
        },

        onDelete: function (index) {
            if (confirm('Sunteti sigur ca doriti sa stergeti ' + this.data[index][0] + '?')) {
                this.data.splice(index, 1);
            }
        },
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        }


    }







})