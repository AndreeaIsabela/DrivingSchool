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
                canCreate: false,
                canEdit: false,
                canDelete: true,
                canArchive: false,
                headers: [
                    { text: 'Numar inscriere', width: 15 },
                    { text: 'De la', width: 65 },
                    { text: 'Numar telefon', width: 20 }
                ]
            },
            {
                title: 'Instructori',
                canCreate: true,
                canEdit: true,
                canDelete: true,
                canArchive: false,
                headers: [
                    { text: 'CNP', width: 10 },
                    { text: 'Nume', width: 30 },
                    { text: 'Prenume', width: 30 },
                    { text: 'Categorie', width: 10 },
                    { text: 'Numar telefon', width: 20 }
                ]
            },
            {
                title: 'Cursanti',
                canCreate: false,
                canEdit: true,
                canDelete: true,
                canArchive: true,
                headers: [
                    { text: 'CNP', width: 10 },
                    { text: 'Nume', width: 30 },
                    { text: 'Prenume', width: 30 },
                    { text: 'Categorie', width: 10 },
                    { text: 'Numar telefon', width: 20 }
                ]
            },
            {
                title: 'Administratori',
                canCreate: true,
                canEdit: false,
                canDelete: false,
                canArchive: false,
                headers: [
                    { text: 'Nume', width: 100 }
                ]
            }
        ],
        currentView: 0,
        viewTitle: 'Inscrieri',
        menuOptionText: {
            request: 'Inscrieri',
            instructor: 'Instructori',
            student: 'Cursanti',
            admin: 'Administratori'
        },
        headers: [
            { text: 'Numar', width: 10 },
            { text: 'Nume', width: 80 },
            { text: 'Action', width: 10 }
        ],
        data: [],
        selectedRowIndex: null
    },
    created: function() {
        this.onRegisterRequests();
    },
    methods: {
        onRegisterRequests: function () {
            this.$http
                .get('/api/registerrequests')
                .then(response => {
                    this.enableView(this.viewIndex.registerRequest);
                    this.clearTable();

                    for (let request of response.data) {
                        this.data.push([
                            request.number,
                            request.name,
                            request.phone
                        ]);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        onInstructors: function () {
            this.$http
                .get('/api/instructors')
                .then(response => {
                    this.enableView(this.viewIndex.instructor);
                    this.clearTable();

                    for (let instructor of response.data) {
                        this.data.push([
                            instructor.cnp,
                            instructor.lastName,
                            instructor.firstName,
                            instructor.category,
                            instructor.phone
                        ]);
                    }
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudents: function () {
            this.$http
                .get('/api/students')
                .then(response => {
                    this.enableView(this.viewIndex.student);
                    this.clearTable();

                    for (let student of response.data) {
                        this.data.push([
                            student.cnp,
                            student.lastName,
                            student.firstName,
                            student.category,
                            student.phone
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onAdmins: function () {
            this.$http
                .get('/api/admins')
                .then(response => {
                    this.enableView(this.viewIndex.admin);
                    this.clearTable();

                    for (let adminData of response.data) {
                        this.data.push([
                            adminData.name
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        enableView: function (viewIndex) {
            this.currentView = viewIndex;
        },
        selectRow(rowIndex) {
            this.selectedRowIndex = this.selectedRowIndex == rowIndex ? null : rowIndex;
        },
        clearTable() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        },
        isCreateEnabled() {
            return this.viewInfo[this.currentView].canCreate;
        },
        isEditEnabled() {
            return this.viewInfo[this.currentView].canEdit && this.selectedRowIndex !== null;
        },
        isDeleteEnabled() {
            return this.viewInfo[this.currentView].canDelete && this.selectedRowIndex !== null;
        }
    }
});