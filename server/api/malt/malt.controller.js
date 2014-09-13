'use strict';

var _ = require('lodash');
var Malt = require('./malt.model');

// Get list of malts
exports.index = function(req, res) {
  Malt.find(function (err, malts) {
    if(err) { return handleError(res, err); }
    return res.json(200, malts);
  });
};

// Get a single malt
exports.show = function(req, res) {
  Malt.findById(req.params.id, function (err, malt) {
    if(err) { return handleError(res, err); }
    if(!malt) { return res.send(404); }
    return res.json(malt);
  });
};

// Creates a new malt in the DB.
exports.create = function(req, res) {
  Malt.create(req.body, function(err, malt) {
    if(err) { return handleError(res, err); }
    return res.json(201, malt);
  });
};

// Updates an existing malt in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Malt.findById(req.params.id, function (err, malt) {
    if (err) { return handleError(res, err); }
    if(!malt) { return res.send(404); }
    var updated = _.merge(malt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, malt);
    });
  });
};

// Deletes a malt from the DB.
exports.destroy = function(req, res) {
  Malt.findById(req.params.id, function (err, malt) {
    if(err) { return handleError(res, err); }
    if(!malt) { return res.send(404); }
    malt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
