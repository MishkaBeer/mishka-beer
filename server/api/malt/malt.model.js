'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaltSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Malt', MaltSchema);
