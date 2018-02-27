var express = require('express');
var bodyParser = require('body-parser');
var movies = require('./data/movies.json');

const port = process.env.PORT || 8888;

var app = express();
app.use(bodyParser.json());

app.get('/movies', (request, response) => {
  response.send(JSON.stringify(movies, null, 2));
});

app.get('/movies/:movieIndex', (request, response) => {
  const movieInx = parseInt(request.params.movieIndex);
  if(movieInx === 0 || movieInx && movies[movieInx]) {
    response.send(JSON.stringify(movies[movieInx], null, 2));
  } else {
    response.status(404);
    response.send('Not found :(');
  }
});

app.post('/movies/', (request, response) => {
  const newMovie = request.body;
  movies.push(newMovie);
  response.location('/' + (movies.length - 1));
  response.status(201);
  response.send('Movie ' + (movies.length - 1) + ' created ;)');
});

app.put('/movies/:movieIndex', (request, response) => {
  const movie = request.body;
  const movieInx = parseInt(request.params.movieIndex);
  if (movieInx < movies.length) {
    movies[movieInx] = movie;
    response.status(200);
    response.send('Movie ' + movieInx + ' updated :D');
  } else {
    response.status(404);
    response.send('Not found :(');
  }
});

var server = app.listen(port);
