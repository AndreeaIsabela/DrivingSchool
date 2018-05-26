$(document).ready(function () {
    $.get("/anonymous/instructors", populateInstructorCombo);
});

function populateInstructorCombo(instructors) {
    let combo = $("#instructorId");

    if (!instructors || instructors.length === 0) {
        combo.attr('disabled', 'true');
        $("#register").attr('disabled', 'true');
        return;
    }

    for (let i in instructors) {
        let selected = i == 0 ? "selected" : "";
        combo.append(
            `<option value="${instructors[i].id}"${selected}>
                ${instructors[i].fullName}
            </option>`);
    }
}

Vue.prototype.$http=axios;

let registerVue=new Vue({
    el: '#registerVue',
    data: {
        registerFormData:{},
    },
    methods:{
        onRegister:function(){
            console.log(this.registerFormData.birthday);
            this.$http
                .post('/student/register',{
                    firstName:this.registerFormData.firstName,
                    familyName:this.registerFormData.familyName,
                    motherName:this.registerFormData.motherName,
                    fatherName:this.registerFormData.fatherName,
                    county:this.registerFormData.county,
                    city:this.registerFormData.city,
                    address:this.registerFormData.address,
                    cnp:this.registerFormData.cnp,
                    serialNumber:this.registerFormData.serialNumber,
                    idCardNumber:this.registerFormData.idCardNumber,
                    isFemale:this.registerFormData.isFemale,
                    isMarried:this.registerFormData.isMarried,
                    phone:this.registerFormData.phone,
                    email:this.registerFormData.email,
                    password:this.registerFormData.password,
                    birthday:this.registerFormData.birthday,
                    instructor:this.registerFormData.instructor
                })
                .then(function(response){
                    console.log(response);
                })
                .catch(function(error){
                 console.log(error);
                })

        }

    }

});

