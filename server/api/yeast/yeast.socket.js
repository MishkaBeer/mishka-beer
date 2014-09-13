/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Yeast = require('./yeast.model');

exports.register = function(socket) {
  Yeast.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Yeast.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('yeast:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('yeast:remove', doc);
}
