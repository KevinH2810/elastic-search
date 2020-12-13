  module.exports = function(app) {
      app.use('/v1/Citizen', require('./Citizen'));
      app.use('/v1/Login', require('./login'));
  }