Vue.prototype.$http = axios;
/*
Vue.component('instructor-form', {
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <form class="create-form">
        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="example@google.com">
        </div>
        <div class="form-group">
            <label for="password">Parola</label>
            <input type="password" class="form-control" id="password" placeholder="Parola">
        </div>
        <div class="form-group">
            <label for="confirmPassword">Confirmare parola</label>
            <input type="password" class="form-control" id="confirmPassword" placeholder="Parola">
        </div>
        <div class="form-group">
            <label for="name">Nume</label>
            <input type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
            <label for="name">Numar autorizatie</label>
            <input type="text" class="form-control" id="authorization">
        </div>
        <div class="form-group">
            <label for="masina">Numar masina</label>
            <input type="text" class="form-control" id="masina">
        </div>
        <div class="form-group">
            <label for="phone">Telefon</label>
            <input type="text" class="form-control" id="phone">
        </div>

        <button type="submit" class="btn btn-primary btn-block">Adauga</button>
    </form>`
});
*/
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
        selectedRowIndex: null,
        createFormEnabled: false
    },
    created: function () {
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
                            request.lastName + ' ' + request.firstName,
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
        onCreate: function () {
            console.log(this.viewIndex);
            this.createFormEnabled = true;
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