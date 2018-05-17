var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = new Schema(
  {
    email: { type: String, required: true },
  }
);

//Export model
module.exports = mongoose.model('Admin', AdminSchema);