var mongoose = require('mongoose');
var studentState = require('./studentState');
const Promise=require('bluebird');
const bcrypt=Promise.promisifyAll(require('bcrypt'))

var mongoDB = 'mongodb://root:root@ds016118.mlab.com:16118/drivingschool';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;

var StudentSchema = new Schema(
    {
        firstName: { type: String, required: true, max: 100 },
        familyName: { type: String, required: true, max: 100 },
        motherName: { type: String, required: true, max: 100 },
        fatherName: { type: String, required: true, max: 100 },
        county: { type: String, required: true, max: 100 },
        city: { type: String, required: true, max: 100 },
        address: { type: String, required: true, max: 200 },
    rank:{type:Number,default:1},        
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
        birthday:{type:Date,required:true},
        serialNumber: { type: String, required: true, max: 2 },
        idCardNumber: { type: String, required: true, max: 5 },
        isFemale: { type: Boolean, required: true },
        isMarried: { type: Boolean, required: true },
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
        instructorId: { type: Schema.ObjectId, ref: 'Instructor' },
        state: { type: Number, default: studentState.unregistered },
        password: { type: String, required: true }
    });

    
const User=mongoose.model('Student', StudentSchema);

User.prototype.comparePassword=function(password){
    return bcrypt.compareAsync(password,this.password)
}

//Export model
module.exports = User;