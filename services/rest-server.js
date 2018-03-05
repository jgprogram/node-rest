const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (config) {
  const app = express();
  var server;

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  this.registerService = (restService) => {
    app.use(restService.path, restService.router);
  }

  this.start = () => {
    server = app.listen(config.server.port);
  }
}
