/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Receipt = require('./receipt.model');

exports.register = function(socket) {
  Receipt.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Receipt.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('receipt:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('receipt:remove', doc);
}
