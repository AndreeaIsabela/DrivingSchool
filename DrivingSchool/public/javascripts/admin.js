Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            registerRequest: 0,
            instructor: 1,
            student: 2,
            admin: 3
        },
        viewInfo: [
            {
                title: 'Inscrieri',
                canAccept: true,
                canDelete: true,
                canArchive: false,
                descriptors: [
                    { text: 'Numar telefon' }
                ]
            },
            {
                title: 'Instructori',
                canCreate: true,
                canEdit: true,
                canDelete: true,
                descriptors: [
                    { text: 'CNP' },
                    { text: 'Categorie' },
                    { text: 'Numar telefon' }
                ]
            },
            {
                title: 'Cursanti',
                canEdit: true,
                canDelete: true,
                canArchive: true,
                descriptors: [
                    { text: 'CNP' },
                    { text: 'Categorie' },
                    { text: 'Numar telefon' }
                ]
            },
            {
                title: 'Administratori',
                canCreate: true,
                descriptors: []
            }
        ],
        currentView: 0,
        viewTitle: 'Inscrieri',
        data: [],
        fullData: [],
        formEnabled: false,
        formData: {}
    },
    created: function () {
        this.onRegisterRequests();
    },
    methods: {
        onRegisterRequests: function () {
            this.setListAction();
            this.$http
                .get('/api/registerrequests')
                .then(response => {
                    this.enableView(this.viewIndex.registerRequest);
                    this.clearList();

                    this.fullData = response.data;
                    for (let request of response.data) {
                        this.data.push([
                            request.lastName + ' ' + request.firstName,
                            request.phone
                        ]);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        onInstructors: function () {
            this.setListAction();
            this.$http
                .get('/api/instructors')
                .then(response => {
                    this.enableView(this.viewIndex.instructor);
                    this.clearList();

                    this.fullData = response.data;
                    for (let instructor of response.data) {
                        this.data.push([
                            instructor.lastName + ' ' + instructor.firstName,
                            instructor.cnp,
                            instructor.category,
                            instructor.phone
                        ]);
                    }
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudents: function () {
            this.setListAction();
            this.$http
                .get('/api/students')
                .then(response => {
                    this.enableView(this.viewIndex.student);
                    this.clearList();

                    this.fullData = response.data;
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
        onAdmins: function () {
            this.setListAction();
            this.$http
                .get('/api/admins')
                .then(response => {
                    this.enableView(this.viewIndex.admin);
                    this.clearList();

                    this.fullData = response.data;
                    for (let adminData of response.data) {
                        
                        this.data.push([
                            adminData.name
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onCreate: function () {
            this.formEnabled = true;
        },
        onSubmit: function() {
            console.log(this.formData);
        },
        onEdit: function (index) {
            this.formEnabled = true;

            this.formData = {};
            let propertyNames = Object.getOwnPropertyNames(this.fullData[index]);
            for(let propName of propertyNames) {
                this.formData[propName] = this.fullData[index][propName];
            }
        },
        onDelete: function (index) {
            if (confirm('Are you sure you want to delete ' + this.data[index][0] + '?')) {
                this.data.splice(index, 1);
            }
        },
        onArchive: function (index) {
            if (confirm('Are you sure you want to archive ' + this.data[index][0] + '?')) {
                this.data.splice(index, 1);
            }
        },
        enableView: function (viewIndex) {
            this.formEnabled = false;
            this.currentView = viewIndex;
        },
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        },
        setListAction() {
            this.formEnabled = false;
        }
    }
});