'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoragelocationSchema = new Schema({
  name: String,
  brewery: {
       type: Schema.ObjectId,
       ref: 'brewery',
       required: 'Please fill brewery'
   },
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Storagelocation', StoragelocationSchema);
