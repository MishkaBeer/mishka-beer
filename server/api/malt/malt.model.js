'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MaltSchema = new Schema({
  name: String,
  ebc: String,
  max_yield: { type: Number, min: 1, max: 100 }
});

module.exports = mongoose.model('Malt', MaltSchema);
