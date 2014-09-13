/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Hop = require('./hop.model');

exports.register = function(socket) {
  Hop.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Hop.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('hop:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('hop:remove', doc);
}
