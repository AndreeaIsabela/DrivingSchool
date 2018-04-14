Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        onRegisterRequests: function () {

            this.$http
                .get('/api/instructors')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onInstructors: function () {

            this.$http
                .get('/api/instructors')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudents: function () {

            this.$http
                .get('/api/instructors')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onAdmins: function () {
            this.$http
                .get('/api/instructors')
                .then(function (response) {
                    console.log(response.data);
                }).catch(function (err) {
                    console.log(err.response);
                });
        }
    }
});