module.exports = function (moviesRepo) {
  this.findAll = (request, response) => {
    response.send(JSON.stringify(moviesRepo.findAll(), null, 2));
  }

  this.findById = (request, response) => {
    const movieId = parseInt(request.params.id);
    const movie = moviesRepo.find(movieId);
    if(movie) {
      response.send(JSON.stringify(movie, null, 2));
    } else {
      response.status(404);
      response.send('Not found :(');
    }
  }

  this.addMovie = (request, response) => {
    const newMovie = request.body;
    const id = moviesRepo.add(newMovie);
    response.location('/movies/' + id);
    response.status(201);
    response.send('Movie ' + id + ' created ;)');
  }

  this.updateMovie = (request, response) => {
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
  }

  this.deleteMovie = (request, response) => {
    const movieId = parseInt(request.params.id); 
    if(moviesRepo.find(movieId)) {
      moviesRepo.remove(movieId);
      response.status(204);
      response.send('Movie ' + movieId + ' deleted :p');
    } else {
      response.status(404);
      response.send('Movie ' + movieId + ' not found :(');
    }
  }
}
