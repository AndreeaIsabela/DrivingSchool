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
                canCreate : false,
                canEdit : false,
                canDelete : true,
                canArchive : false
            },
            {
                title: 'Instructori',
                canCreate : true,
                canEdit : true,
                canDelete : true,
                canArchive : false
            },
            {
                title: 'Cursanti',
                canCreate : false,
                canEdit : true,
                canDelete : true,
                canArchive : true
            },
            {
                title: 'Administratori',
                canCreate : true,
                canEdit : false,
                canDelete : false,
                canArchive : false
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
        data: [
            [1, 'Ion', 'Ion'],
            [1, 'Ion', 'Ion'],
            [1, 'Ion', 'Ion'],
            [1, 'Ion', 'Ion']
        ],
        selectedRowIndex: null
    },
    methods: {
        onRegisterRequests: function () {
            this.enableView(this.viewIndex.registerRequest);

            this.$http
                .get('/api/registerrequests')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onInstructors: function () {
            this.enableView(this.viewIndex.instructor);

            this.$http
                .get('/api/students')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudents: function () {
            this.enableView(this.viewIndex.student);

            this.$http
                .get('/api/instructors')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onAdmins: function () {
            this.enableView(this.viewIndex.admin);

            this.$http
                .get('/api/admins')
                .then(function (response) {
                    console.log(response.data);
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