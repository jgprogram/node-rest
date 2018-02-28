const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (config) {
  const app = express();
  var server;
  app.use(bodyParser.json());

  this.registerService = (restService) => {
    app.use(restService.path, restService.router);
  }

  this.start = () => {
    server = app.listen(config.server.port);
  }
}
