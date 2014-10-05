/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Storagelocation = require('./storagelocation.model');

exports.register = function(socket) {
  Storagelocation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Storagelocation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('storagelocation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('storagelocation:remove', doc);
}
