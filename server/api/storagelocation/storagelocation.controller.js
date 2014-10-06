'use strict';

var _ = require('lodash');
var Storagelocation = require('./storagelocation.model');

// Get list of storagelocations
exports.index = function(req, res) {
  Storagelocation.find(function (err, storagelocations) {
    if(err) { return handleError(res, err); }
    return res.json(200, storagelocations);
  });
};

// Get a single storagelocation
exports.show = function(req, res) {
  Storagelocation.findById(req.params.id, function (err, storagelocation) {
    if(err) { return handleError(res, err); }
    if(!storagelocation) { return res.send(404); }
    return res.json(storagelocation);
  });
};

// Creates a new storagelocation in the DB.
exports.create = function(req, res) {
  Storagelocation.create(req.body, function(err, storagelocation) {
    if(err) { return handleError(res, err); }
    return res.json(201, storagelocation);
  });
};

// Updates an existing storagelocation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Storagelocation.findById(req.params.id, function (err, storagelocation) {
    if (err) { return handleError(res, err); }
    if(!storagelocation) { return res.send(404); }
    var updated = _.merge(storagelocation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, storagelocation);
    });
  });
};

// Deletes a storagelocation from the DB.
exports.destroy = function(req, res) {
  Storagelocation.findById(req.params.id, function (err, storagelocation) {
    if(err) { return handleError(res, err); }
    if(!storagelocation) { return res.send(404); }
    storagelocation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
