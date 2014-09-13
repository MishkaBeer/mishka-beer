'use strict';

var _ = require('lodash');
var Yeast = require('./yeast.model');

// Get list of yeasts
exports.index = function(req, res) {
  Yeast.find(function (err, yeasts) {
    if(err) { return handleError(res, err); }
    return res.json(200, yeasts);
  });
};

// Get a single yeast
exports.show = function(req, res) {
  Yeast.findById(req.params.id, function (err, yeast) {
    if(err) { return handleError(res, err); }
    if(!yeast) { return res.send(404); }
    return res.json(yeast);
  });
};

// Creates a new yeast in the DB.
exports.create = function(req, res) {
  Yeast.create(req.body, function(err, yeast) {
    if(err) { return handleError(res, err); }
    return res.json(201, yeast);
  });
};

// Updates an existing yeast in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Yeast.findById(req.params.id, function (err, yeast) {
    if (err) { return handleError(res, err); }
    if(!yeast) { return res.send(404); }
    var updated = _.merge(yeast, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, yeast);
    });
  });
};

// Deletes a yeast from the DB.
exports.destroy = function(req, res) {
  Yeast.findById(req.params.id, function (err, yeast) {
    if(err) { return handleError(res, err); }
    if(!yeast) { return res.send(404); }
    yeast.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
