const config = require('./config/config.js');
const RestServer = require('./services/rest-server.js');
const moviesService = require('./movies/rest/movies-service.js'); 

const server = new RestServer(config);
server.registerService(moviesService.inMemoryService);
server.start();
