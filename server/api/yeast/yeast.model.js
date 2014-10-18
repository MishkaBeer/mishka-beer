'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var YeastSchema = new Schema({
    name: String,
    efficiency: {type: Number, min: 0, max: 100},
    temperature_optimal : {
        min : Number,
        max : Number
    },
    temperature_max : {
        min : Number,
        max : Number
    },
    description: String
});

module.exports = mongoose.model('Yeast', YeastSchema);
