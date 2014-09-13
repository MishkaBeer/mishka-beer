'use strict';

var _ = require('lodash');
var Hop = require('./hop.model');

// Get list of hops
exports.index = function(req, res) {
  Hop.find(function (err, hops) {
    if(err) { return handleError(res, err); }
    return res.json(200, hops);
  });
};

// Get a single hop
exports.show = function(req, res) {
  Hop.findById(req.params.id, function (err, hop) {
    if(err) { return handleError(res, err); }
    if(!hop) { return res.send(404); }
    return res.json(hop);
  });
};

// Creates a new hop in the DB.
exports.create = function(req, res) {
  Hop.create(req.body, function(err, hop) {
    if(err) { return handleError(res, err); }
    return res.json(201, hop);
  });
};

// Updates an existing hop in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hop.findById(req.params.id, function (err, hop) {
    if (err) { return handleError(res, err); }
    if(!hop) { return res.send(404); }
    var updated = _.merge(hop, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, hop);
    });
  });
};

// Deletes a hop from the DB.
exports.destroy = function(req, res) {
  Hop.findById(req.params.id, function (err, hop) {
    if(err) { return handleError(res, err); }
    if(!hop) { return res.send(404); }
    hop.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
