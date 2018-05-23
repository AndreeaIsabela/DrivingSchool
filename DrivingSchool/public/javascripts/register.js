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