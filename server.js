const express = require('express');
const bodyParser = require('body-parser');
const movies = require('./data/movies.json');
const MoviesRepository = require('./movies-repository');

const port = process.env.PORT || 8888;
const app = express();
app.use(bodyParser.json());

const moviesRepo = new MoviesRepository();
movies.forEach((movie) => { moviesRepo.add(movie) });

app.get('/movies', (request, response) => {
  response.send(JSON.stringify(moviesRepo.findAll(), null, 2));
});

app.get('/movies/:id', (request, response) => {
  const movieId = parseInt(request.params.id);
  const movie = moviesRepo.find(movieId);
  if(movie) {
    response.send(JSON.stringify(movie, null, 2));
  } else {
    response.status(404);
    response.send('Not found :(');
  }
});

app.post('/movies/', (request, response) => {
  const newMovie = request.body;
  const id = moviesRepo.add(newMovie);
  response.location('/movies/' + id);
  response.status(201);
  response.send('Movie ' + id + ' created ;)');
});

app.put('/movies/:id', (request, response) => {
  const movie = request.body;
  const movieId = parseInt(request.params.id);
    
  if(moviesRepo.find(movieId)) {
    moviesRepo.update(movieId, movie);
    response.status(200);
    response.send('Movie ' + movieId + ' updated :D');
  } else {
    response.status(404);
    response.send('Movie ' + movieId + ' not found :(');
  }
});

app.delete('/movies/:id', (request, response) => {
  const movieId = parseInt(request.params.id);
  if(moviesRepo.find(movieId)) {
    moviesRepo.remove(movieId);
    response.status(204);
    response.send('Movie ' + movieId + ' deleted :p');
  } else {
    response.status(404);
    response.send('Movie ' + movieId + ' not found :(');
  }
});

const server = app.listen(port);
