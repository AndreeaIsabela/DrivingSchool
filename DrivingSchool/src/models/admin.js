var mongoose = require('mongoose');
const Promise=require('bluebird');
const bcrypt=Promise.promisifyAll(require('bcrypt'))

var Schema = mongoose.Schema;

var AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
);

const User=mongoose.model('Admin', AdminSchema);

User.prototype.comparePassword=function(password){
    return bcrypt.compareAsync(password,this.password)
}

//Export model
module.exports = User;