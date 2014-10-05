/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/y', require('./api/storagelocation'));
  app.use('/y', require('./api/brewery'));
  app.use('/api/stocks', require('./api/stock'));
  app.use('/api/yeasts', require('./api/yeast'));
  app.use('/api/malts', require('./api/malt'));
  app.use('/api/hops', require('./api/hop'));
  app.use('/api/things', require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
