'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaltSchema = new Schema({
  name: String,
  ebc: String,
  maxyield: { type: Number, min: 1, max: 100 },
  description: String
});

module.exports = mongoose.model('Malt', MaltSchema);
