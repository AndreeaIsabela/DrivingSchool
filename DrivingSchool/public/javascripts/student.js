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
        legislation:0,
        
        responseLesson: [],
    },
    created: function () {
        this.onSchedule();
    },
    methods: {
       
        onSchedule: function () {
            this.$http
                .get('/instructor/drivingLesson')
                .then(response => {
                    this.responseLesson = [];
                    this.enableView(this.viewIndex.schedule);
                    this.clearList();

                    for (let lesson of response.data) {
                        
                        this.responseLesson.push({
                            time: lesson.time,
                            date: lesson.date,
                            studentName:lesson.studentName,
                            teacherName: lesson.teacherName,
                            location: lesson.location
                        });}
                        console.log(this.responseLesson);
                    }).catch(err => {
                        console.log(err);
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