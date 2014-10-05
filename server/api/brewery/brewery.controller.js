'use strict';

var _ = require('lodash');
var Brewery = require('./brewery.model');

// Get list of brewerys
exports.index = function(req, res) {
  Brewery.find(function (err, brewerys) {
    if(err) { return handleError(res, err); }
    return res.json(200, brewerys);
  });
};

// Get a single brewery
exports.show = function(req, res) {
  Brewery.findById(req.params.id, function (err, brewery) {
    if(err) { return handleError(res, err); }
    if(!brewery) { return res.send(404); }
    return res.json(brewery);
  });
};

// Creates a new brewery in the DB.
exports.create = function(req, res) {
  Brewery.create(req.body, function(err, brewery) {
    if(err) { return handleError(res, err); }
    return res.json(201, brewery);
  });
};

// Updates an existing brewery in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Brewery.findById(req.params.id, function (err, brewery) {
    if (err) { return handleError(res, err); }
    if(!brewery) { return res.send(404); }
    var updated = _.merge(brewery, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, brewery);
    });
  });
};

// Deletes a brewery from the DB.
exports.destroy = function(req, res) {
  Brewery.findById(req.params.id, function (err, brewery) {
    if(err) { return handleError(res, err); }
    if(!brewery) { return res.send(404); }
    brewery.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
