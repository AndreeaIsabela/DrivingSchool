Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        viewIndex : {
            registerRequestView : 1,
            instructorView : 2,
            studentView : 3,
            adminView : 4
        },
        currentView : 1
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
        enableView : function(viewIndex) {
            this.currentView = viewIndex;
        }
    }
});