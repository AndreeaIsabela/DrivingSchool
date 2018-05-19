var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  }
);

module.exports = mongoose.model('Admin2', AdminSchema);