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
        actionType: {
            list: 0,
            edit: 1,
            delete: 2,
            archive: 3,
            create: 4
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
        currentActionType: 0,
        viewTitle: 'Inscrieri',
        data: [],
        createFormEnabled: false
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
            this.currentActionType = this.actionType.create;
            console.log(this.currentActionType);
        },
        onEdit: function () {

        },
        onDelete: function () {

        },
        onArchive: function () {

        },
        enableView: function (viewIndex) {
            this.createFormEnabled = false;
            this.currentView = viewIndex;
        },
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        },
        setListAction() {
            this.currentActionType = this.actionType.list;
        }
    }
});