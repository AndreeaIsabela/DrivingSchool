Vue.prototype.$http = axios;

let app = new Vue({
    el: '#app',
    data: {
        viewIndex: {
            registerRequest: 0,
            instructor: 1,
            student: 2,
            admin: 3,
            archive: 4,
            folder: 5
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
                    { text: 'Masina' },
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
                    { text: 'Numar telefon' }
                ]
            },
            {
                title: 'Administratori',
                canCreate: true,
                descriptors: []
            },
            {
                title: 'Arhiva cursanti',
                canDelete: true,
                canRestore: true,
                descriptors: [
                    { text: 'CNP' },
                    { text: 'Numar telefon' }
                ]
            },
            {
                title: 'Dosar',
            }
        ],
        currentView: 0,
        viewTitle: 'Inscrieri',
        data: [],
        fullData: [],
        ids: [],
        formEnabled: false,
        formData: {},
        edit: false,
        editId: '',
        folderId: 0
    },
    created: function () {
        this.onRegisterRequests();
    },
    methods: {
        onRegisterRequests: function () {
            this.$http
                .get('/student/requests')
                .then(response => {
                    this.enableView(this.viewIndex.registerRequest);
                    this.clearList();

                    this.fullData = response.data;
                    for (let request of response.data) {
                        this.ids.push(request._id);

                        this.data.push([
                            request.familyName + ' ' + request.firstName,
                            request.phone
                        ]);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        onInstructors: function () {
            this.$http
                .get('/instructor')
                .then(response => {
                    this.enableView(this.viewIndex.instructor);
                    this.clearList();

                    this.fullData = response.data;
                    for (let instructor of response.data) {
                        this.ids.push(instructor._id);

                        this.data.push([
                            instructor.familyName + ' ' + instructor.firstName,
                            instructor.carNumber,
                            instructor.phoneNumber
                        ]);
                    }
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudents: function () {
            this.$http
                .get('/student')
                .then(response => {
                    this.enableView(this.viewIndex.student);
                    this.clearList();

                    this.fullData = response.data;

                    for (let student of response.data) {
                        this.ids.push(student._id);

                        this.data.push([
                            student.familyName + ' ' + student.firstName,
                            student.cnp,
                            student.phone
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onAdmins: function () {
            this.$http
                .get('/admin')
                .then(response => {
                    this.enableView(this.viewIndex.admin);
                    this.clearList();

                    this.fullData = response.data;
                    for (let adminData of response.data) {
                        this.ids.push(adminData._id);
                        this.data.push([
                            adminData.email
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onStudentArchive: function () {
            this.$http
                .get('/student/archive')
                .then(response => {
                    this.enableView(this.viewIndex.archive);
                    this.clearList();

                    this.fullData = response.data;
                    for (let student of response.data) {
                        this.ids.push(student._id);
                        this.data.push([
                            student.familyName + ' ' + student.firstName,
                            student.category,
                            student.phone
                        ]);
                    };
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onFolder: function () {
            this.enableView(this.viewIndex.folder);
            this.formEnabled = true;
            this.formData = {
                students: []
            };

            this.$http
                .get('/student')
                .then(response => {
                    for (let i in response.data) {

                        let student = response.data[i];

                        this.formData.students.push({
                            name: `${student.familyName} ${student.firstName}`,
                            id: student._id
                        });

                        if (i == 0) {
                            this.formData.studentId = { id: student._id };
                        }
                    }
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onGenerateFolder: function () {
            let folderData = Object.assign({}, this.formData);

            folderData.students = undefined;
            folderData.studentId = undefined;

            this.$http({
                url: `/student/${this.formData.studentId.id}/folder`,
                data: folderData,
                method: 'POST',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'dosar.pdf');
                document.body.appendChild(link);
                link.click();
            });
        },
        onLogout: function () {

        },
        onCreate: function () {
            this.formEnabled = true;
        },
        onAccept: function (index) {
            console.log(this.ids[index]);
            let url = "/student/" + this.ids[index] + "/accept";
            console.log(url);

            this.$http.post(url, {})
                .then((response) => {

                    alert(`Student ${this.data[index][0]} has been added`);

                    this.ids.splice(index, 1);
                    this.data.splice(index, 1);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onSubmit: function () {
            if (this.edit) {
                return this.onSubmitEdit();
            }
            return this.onSubmitCreate();
        },
        onSubmitCreate: function () {
            const url = this.currentView == this.viewIndex.instructor
                ? "/instructor/"
                : "/admin/";

            this.$http
                .post(url, this.formData)
                .then(response => {
                    if (this.currentView == this.viewIndex.instructor) {
                        this.onInstructors();
                    } else {
                        this.onAdmins();
                    }
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onSubmitEdit: function () {
            const url = this.currentView == this.viewIndex.instructor
                ? "/instructor/" + this.editId
                : "/student/" + this.editId;

            this.$http
                .put(url, this.formData)
                .then(response => {
                    alert('Modificarile au fost salvate cu succes!');

                    if (this.currentView == this.viewIndex.instructor) {
                        this.onInstructors();
                    }
                    else if (this.currentView == this.viewIndex.student) {
                        this.onStudents();
                    }

                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onEdit: function (index) {
            let httpLink = "";
            if (this.currentView == this.viewIndex.student) {
                httpLink = "/student/" + this.ids[index];
            } else if (this.currentView == this.viewIndex.instructor) {
                httpLink = "/instructor/" + this.ids[index];
            }

            this.editId = this.ids[index];

            this.$http
                .get(httpLink)
                .then(response => {
                    this.edit = true;
                    this.formEnabled = true;
                    this.formData = {};

                    let propertyNames = Object.getOwnPropertyNames(response.data);
                    for (let propName of propertyNames) {
                        this.formData[propName] = response.data[propName];
                    }
                    this.formData.confirmPassword = response.data.password;
                }).catch(function (err) {
                    console.log(err.response);
                });
        },
        onDelete: function (index) {
            let url = "/";
            if (this.currentView == this.viewIndex.student ||
                this.currentView == this.viewIndex.registerRequest ||
                this.currentView == this.viewIndex.archive) {

                url += "student";
            }
            else if (this.currentView == this.viewIndex.instructor) {
                url += "instructor";
            }
            url += "/" + this.ids[index];

            if (confirm('Sunteti sigur ca doriti sa stergeti ' + this.data[index][0] + '?')) {
                console.log(url);
                this.$http.delete(url, {})
                    .then((response) => {
                        this.ids.splice(index, 1);
                        this.data.splice(index, 1);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        onArchive: function (index) {
            if (confirm('Sunteti sigur ca doriti sa arhivati studentul ' + this.data[index][0] + '?')) {

                let url = "/student/" + this.ids[index] + "/archive";
                this.$http.post(url, {})
                    .then(response => {
                        this.ids.splice(index), 1;
                        this.data.splice(index, 1);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        onRestore: function (index) {
            let url = "/student/" + this.ids[index] + "/unarchive";
            console.log(url);
            this.$http.post(url, {})
                .then(response => {
                    this.ids.splice(index), 1;
                    this.data.splice(index, 1);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        enableView: function (viewIndex) {
            this.formEnabled = false;
            this.formData = {};
            this.currentView = viewIndex;
        },
        clearList() {
            this.selectedRowIndex = null;
            this.data.splice(0, this.data.length);
            this.ids.splice(0, this.ids.length);
        }
    }
});