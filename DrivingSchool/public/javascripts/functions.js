
"use strict";
$(document).ready(function () {
    $('body').scrollspy({ target: ".navbar", offset: 70 });
    $('[data-toggle="tooltip"]').tooltip();

    let viewLoginPwd = false;
    $("#eyeClick").click(function () {

        let getPwdLogin = $("#viewPwdLogin");
        let eyeChange = $("#eyeClick");

        if (viewLoginPwd === false) {
            getPwdLogin.attr("type", "text");
            eyeChange.attr('class', 'glyphicon glyphicon-eye-open ');
            viewLoginPwd = true;
        }
        else {
            getPwdLogin.attr("type", "password");
            eyeChange.attr('class', 'glyphicon glyphicon-eye-close ');
            viewLoginPwd = false;
        }
    });
    //$.get("/api/instructors", populateInstructors);

    let instructors = [{ name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 },{ name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 },{ name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 },{ name: 'Ion', categorie: 'B', tarif: 1200 }, { name: 'Ion', categorie: 'B', tarif: 1200 }];
    populateInstructors(instructors);
});

function populateInstructors(instructors) {
    let tableBody = $("tbody");

    for (let instructor of instructors) {
        console.log(tableBody.html());
        tableBody.append(
            `<tr>
                <td>${instructor.name}</td>
                <td>${instructor.categorie}</td>
                <td>${instructor.tarif}</td>
            </tr>`);
    }
}