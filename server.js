var port = process.env.PORT || 8888;
var http = require('http');
var movies = require('./data/movies.json');

var requestHandler = function(request, response) {
  if(request.method === 'GET') {
    if(request.url === '/') {
      response.end(JSON.stringify(movies, null, 2));
    } else {
      const movieInx = parseInt(request.url.substr(1));
      if(movieInx === 0 || movieInx && movies[movieInx]) {
        response.end(JSON.stringify(movies[movieInx], null, 2));
      } else {
        response.statusCode = 404;
        response.end();
      }
    }
  } else if(request.method === 'POST') {
    let bodyChunks = [];
    request.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      const json = Buffer.concat(bodyChunks).toString();
      try {
        const newMovie = JSON.parse(json);
        movies.push(newMovie);
        response.setHeader('Location', '/' + (movies.length - 1));
        response.statusCode = 201;
      } catch (err) {
        response.statusCode = 500;
      } finally {
        response.end();
      }
    });
  }
}

var server = http.createServer(requestHandler);
server.listen(port);
