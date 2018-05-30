Vue.prototype.$http = axios;



let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            student: 0,
            schedule: 1,
        },
       

        currentView: 1,
        studentList: [],
        data: [],
        lessons: {
            // date:null,
            // time:null,
            // studentName:null,
            // teacherName:null,
            // location:null
        },
        responseLesson: [],
    },
    methods: {
        onStudents: function () {
            this.$http
                .get('/instructor/students')
                .then(response => {
                    this.enableView(this.viewIndex.student);
                    this.clearList();

                   
                    for (let student of response.data) {
                        console.log(student);
                        this.studentList.push(
                            {
                            firstName:student.firstName,
                            
                            phone:student.phone
                            }
                        );
                    };
                }).catch(function (err) {
                    console.log(err);
                });
        },
        onAddLesson: function () {
            console.log(this.lessons);
            this.$http
                .post('/instructor/drivingLesson', {

                    time: this.lessons.time.toString(),
                    date: this.lessons.date,
                    studentName: this.lessons.studentName,
                    teacherName: this.lessons.teacherName,
                    location: this.lessons.location,
                })
                .then(function (response) {
                    console.log(response);
                    window.location.reload(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        onSchedule: function () {
            this.$http
                .get('/instructor/drivingLesson')
                .then(response => {
                    this.responseLesson = [];
                    this.enableView(this.viewIndex.schedule);
                    this.clearList();

                    for (let lesson of response.data) {
                        
                        this.responseLesson.push({
                            _id: lesson._id,
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
        enableView: function (viewIndex) {
            this.currentView = viewIndex;
        },
       
        onCreate: function () {
            this.formEnabled = true;
        },

        onDelete: function (id) {
            console.log(id);
            let url='/instructor/drivingLesson/'+id;
            console.log("URL ESTE  ", url);
            this.$http.delete(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
        }


    }







})