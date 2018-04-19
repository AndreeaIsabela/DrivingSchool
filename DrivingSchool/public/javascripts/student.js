Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            schedule: 0,
            legislation: 1
        },
        viewInfo: [
            {
                title: 'Sedinte auto',
                descriptors: [
                    { text: 'Numar telefon' }
                ]
            },
            {
                title: 'Legislatie auto',
                descriptors: [
                    { text: 'Autorizatie' },
                    { text: 'Masina' },
                    { text: 'Numar telefon' }
                ]
            }
        ],
        currentView: 0,
        data: [],
    },
    created: function () {
        this.onSchedule();
    },
    methods: {
        onSchedule: function () {
            this.$http
                .get('/api/registerrequests')
                .then(response => {
                    this.enableView(this.viewIndex.schedule);
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
        onLegislation: function () {
            this.$http
                .get('/api/instructors')
                .then(response => {
                    this.enableView(this.viewIndex.legislation);
                    this.clearList();

                    this.fullData = response.data;
                    for (let instructor of response.data) {
                        this.data.push([
                            instructor.lastName + ' ' + instructor.firstName,
                            instructor.authorization,
                            instructor.carNumber,
                            instructor.phone
                        ]);
                    }
                    console.log(this.fullData);
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        enableView: function (viewIndex) {
            this.currentView = viewIndex;
        },
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        }
    }
});