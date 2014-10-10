'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaltTypes = ["sugar", "malt", "raw"];

var MaltSchema = new Schema({
  name: String,
  ebc: String,
  maxyield: { type: Number, min: 0, max: 100 },
  maxuse: { type: Number, min: 0, max: 100 },
  mash: Boolean,
  type: { type: String, enum: MaltTypes },
  description: String
});

module.exports = mongoose.model('Malt', MaltSchema);
