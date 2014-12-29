'use strict';

var _ = require('lodash');
var Receipt = require('./receipt.model');

// Get list of receipts
exports.index = function(req, res) {
  Receipt.find(function (err, receipts) {
    if(err) { return handleError(res, err); }
    return res.json(200, receipts);
  });
};

// Get a single receipt
exports.show = function(req, res) {
  Receipt.findById(req.params.id, function (err, receipt) {
    if(err) { return handleError(res, err); }
    if(!receipt) { return res.send(404); }
    return res.json(receipt);
  });
};

// Creates a new receipt in the DB.
exports.create = function(req, res) {
  Receipt.create(req.body, function(err, receipt) {
    if(err) { return handleError(res, err); }
    return res.json(201, receipt);
  });
};

// Updates an existing receipt in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Receipt.findById(req.params.id, function (err, receipt) {
    if (err) { return handleError(res, err); }
    if(!receipt) { return res.send(404); }
    var updated = _.merge(receipt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, receipt);
    });
  });
};

// Deletes a receipt from the DB.
exports.destroy = function(req, res) {
  Receipt.findById(req.params.id, function (err, receipt) {
    if(err) { return handleError(res, err); }
    if(!receipt) { return res.send(404); }
    receipt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
