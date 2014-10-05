'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoragelocationSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Storagelocation', StoragelocationSchema);
