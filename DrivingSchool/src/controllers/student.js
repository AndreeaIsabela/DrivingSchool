const studentState = require('../models/studentState');
const PDF = require('pdfkit');
const fs = require('fs');
const path = require('path');
const text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';
const Promise=require('bluebird');
const bcrypt=Promise.promisifyAll(require('bcrypt'))
class StudentController {
    constructor(studentModel) {
        this.student = studentModel;
    }

    getStudents(done) {
        this.student.find({ state: studentState.registered }).exec(done);
    }
    getStudent(id, done) {
        this.student.findById(id, done);
    }
    getArchivedStudents(done) {
        this.student.find({ state: studentState.archived }).exec(done);
    }
    getStudentRequests(done) {
        this.student.find({ state: studentState.unregistered }).exec(done);
    }
    archiveStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id },
            { $set: { state: studentState.archived } },
            done);
    }
    unarchiveStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id },
            { $set: { state: studentState.registered } },
            done);
    }
    registerStudent(id, done) {
        this.student.findOneAndUpdate({ _id: id },
            { $set: { state: studentState.registered } },
            done);
    }
    updateStudent(id, student, done) {
        if (student.password != student.confirmPassword) {
            let err = new Error('Password mismatch');
            return done(err, null);
        }

        this.student.findOneAndUpdate({ _id: id }, student, { new: true }, done);
    }
    deleteStudent(id, done) {
        this.student.findByIdAndRemove(id, done);
    }
    hashPassword(user){

        const SALT_FACTOR=8;
      
        return bcrypt
           .genSalt(SALT_FACTOR)
           .then(salt=> bcrypt.hashAsync(user.password,salt,null))
           .then(hash=>{
             user.setDataValue('password',hash)
           })
           .catch(function (err) {
            console.log(err);
        });
      }
    createRegisterRequest(body, done) {

        this.hashPassword(body.password);
        body.state = studentState.unregistered;
        let request = new this.student(body);
        request.save(done);
    }
    generateFolder(id, config, done) {
        this.student.findById(id, (err, student) => {

            if (err) {
                return done(err, null);
            }

            if (!student) {
                return done(null, null);
            }

            let pdfPath = path.join(__dirname, `/../../pdfs/${id}.pdf`);

            var doc = new PDF();

            this.addPdfPages(doc, config, student);

            let stream = fs.createWriteStream(pdfPath);
            stream.on('finish', () => {
                done(null, pdfPath);
            })
            doc.pipe(stream);
            doc.end();
        });
    }

    addPdfPages(pdfDoc, config, student) {
        console.log(config);

        let first = false;
        let addNewPdfPage = function() {
            if(!first) {
                first = true;
                return;
            }
            pdfDoc.addPage();
        };

        if (config.schoolApplication) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Cerere de scolarizare', student);
        }
        if (config.contract) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Contract de scolarizare', student);
        }
        if (config.notebook) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Caietul cursantului', student);
        }
        if (config.graduationCertificate) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Adeverinta de absolvire', student);
        }
        if (config.schoolFile) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Fisa de scolarizare', student);
        }
        if (config.examApplication) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Cerere pentru examen', student);
        }
        if (config.medicalFile) {
            addNewPdfPage();
            this.addPdfPage(pdfDoc, 'Fisa medicala', student);
        }
    }

    addPdfPage(pdfDoc, pageTitle, student) {
        pdfDoc.fontSize(24);
        pdfDoc.text(pageTitle, 100, 100);
        pdfDoc.fontSize(12);

        let txt = '';
        let addLine = (propName, propValue) => {
            txt += `${propName}: ${propValue}\n`;
        };

        addLine('Email', student.email);
        addLine('Prenume', student.firstName);
        addLine('Nume', student.familyName);
        addLine('Mama', student.motherName);
        addLine('Tata', student.fatherName);
        addLine('Judet', student.county);
        addLine('Oras', student.city);
        addLine('Adresa', student.address);
        addLine('CNP', student.cnp);
        addLine('Serie buletin', student.serialNumber);
        addLine('Numar buletin', student.idCardNumber);
        addLine('Sex', student.isFemale ? 'Feminin' : 'Masculin');
        addLine('Casatorit', student.isMarried ? 'Da' : 'Nu');
        addLine('Numar telefon', student.phone);

        pdfDoc.text(txt, 100, 150);
    }
}

module.exports = StudentController;