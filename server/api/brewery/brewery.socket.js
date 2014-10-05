/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Brewery = require('./brewery.model');

exports.register = function(socket) {
  Brewery.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Brewery.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('brewery:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('brewery:remove', doc);
}
