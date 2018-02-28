const MoviesRouter = require('./movies-router.js');
const MoviesController = require('./movies-controller.js');
const MoviesInMemoryRepository = require('../in-memory-repository.js');

module.exports.inMemoryService = {
  path: '/movies',
  router: new MoviesRouter(new MoviesController(new MoviesInMemoryRepository()))
}
