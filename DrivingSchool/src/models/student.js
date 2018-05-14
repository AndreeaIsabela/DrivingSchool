var mongoose = require('mongoose');
var studentState = require('./studentState')

var Schema = mongoose.Schema;

var StudentSchema = new Schema(
    {
        firstName: { type: String, required: true, max: 100 },
        familyName: { type: String, required: true, max: 100 },
        motherFName: { type: String, required: true, max: 100 },
        fatherFName: { type: String, required: true, max: 100 },
        county: { type: String, required: true, max: 100 },
        town: { type: String, required: true, max: 100 },
        address: { type: String, required: true, max: 200 },
        cnp: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{13}/.test(v);
                },
                message: '{VALUE} is not a valid CNP!'
            },
            required: [true, 'User CNP required'],
            unique: true
        },
        ser: { type: String, required: true, max: 2 },
        icNo: { type: String, required: true, max: 5 },
        date_of_birth: { type: Date },
        gender: { type: Boolean, enum: ["Male", "Female"] },
        civilState: { type: Boolean, enum: ["Married", "Notmarried"] },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{10}/.test(v);
                },
                message: '{VALUE} is not a valid phone number!'
            },
            required: [true, 'User phone number required']
        },
        email: {
            type: String,
            validate: {
                validator: function (email) {
                    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailReg.test(email);
                },
                message: 'not a valid email'
            },
            required: [true, 'User email required']
        },
        passwordHash: { type: String, required: true },
        instructor: { type: Schema.ObjectId, ref: 'Instructor' },
        state: { type: Number, default: studentState.unregistered }
    });

// Virtual for student's full name
StudentSchema
    .virtual('name')
    .get(function () {
        return this.familyName + ', ' + this.firstName;
    });


//Export model
module.exports = mongoose.model('Student', StudentSchema);