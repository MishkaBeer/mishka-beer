'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HopSchema = new Schema({
  name: String,
  alpha_range: {
      min : {type: Number, min: 0, max: 100},
      max : {type: Number, min: 0, max: 100}
  },
  flavor: { type: Number, min: 1, max: 10 },
  description: String
});

module.exports = mongoose.model('Hop', HopSchema);
