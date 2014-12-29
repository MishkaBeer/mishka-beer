'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
