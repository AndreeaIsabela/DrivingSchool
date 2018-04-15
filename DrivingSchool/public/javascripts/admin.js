Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            registerRequestView: 1,
            instructorView: 2,
            studentView: 3,
            adminView: 4
        },
        currentView: 1,
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
            this.enableView(this.viewIndex.registerRequestView);

            this.$http
                .get('/api/registerrequests')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onInstructors: function () {
            this.enableView(this.viewIndex.instructorView);

            this.$http
                .get('/api/students')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudents: function () {
            this.enableView(this.viewIndex.studentView);

            this.$http
                .get('/api/instructors')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onAdmins: function () {
            this.enableView(this.viewIndex.adminView);

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
            console.log(rowIndex);
            this.selectedRowIndex = this.selectedRowIndex == rowIndex ? null : rowIndex;
        }
    }
});