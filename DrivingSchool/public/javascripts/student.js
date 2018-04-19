Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            schedule: 0,
        },
        viewInfo: [
            {
                title: 'Sedinte auto',
                descriptors: [
                    { text: 'Location' }
                ]
            },
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
                .get('/api/students/sss/schedule')
                .then(response => {
                    this.enableView(this.viewIndex.schedule);
                    this.clearList();

                    this.fullData = response.data;
                    for (let request of response.data) {
                        this.data.push([
                            request.date + ' ' + request.hour,
                            request.location
                        ]);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        onLegislation: function () {
            this.$http
                .get('/api/legislation')
                .then(response => {
                    
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onLogout: function() {

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