const express = require('express');

module.exports = function (moviesCtrl) {
  const router = express.Router();

  router.route('/')
    .get(moviesCtrl.findAll)
    .post(moviesCtrl.addMovie);

  router.route('/:id')
    .get(moviesCtrl.findById)
    .put(moviesCtrl.updateMovie)
    .delete(moviesCtrl.deleteMovie);

  return router;
}
