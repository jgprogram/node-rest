module.exports = function (moviesRepo) {
  this.findAll = (request, response) => {
    moviesRepo.findAll()
      .then((movies) => {
        response.send(JSON.stringify(movies, null, 2));
      })
      .catch((err) => {
        addInternalErrorResponse(response);
      });
  }

  this.findById = (request, response) => {
    const movieId = parseInt(request.params.id);

    moviesRepo.find(movieId)
      .then((movie) => {
        if(movie) {
          response.send(JSON.stringify(movie, null, 2));
        } else {
          addNotFoundResponse(response);
        }
      })
      .catch((err) => {
        addInternalErrorResponse(response);
      });
  }

  this.addMovie = (request, response) => {
    const newMovie = request.body;
    
    moviesRepo.add(newMovie)
      .then((id) => {
        response.location('/movies/' + id);
        response.status(201);
        response.send('Movie ' + id + ' created ;)');
      })
      .catch((err) => {
        addInternalErrorResponse(response);
      });
  }

  this.updateMovie = (request, response) => {
    const newMovie = request.body;
    const movieId = parseInt(request.params.id);

    moviesRepo.find(movieId)
      .then((movie) => {
        if(movie) {
          moviesRepo.update(movieId, newMovie)
            .then(() => {
              response.status(200);
              response.send('Movie ' + movieId + ' updated :D');
            })
            .catch((err) => {
              addInternalErrorResponse(response);
           });
        } else {
          addNotFoundResponse(response);
        }
      })
      .catch((err) => {
        addInternalErrorResponse(response);
      });
  }

  this.deleteMovie = (request, response) => {
    const movieId = parseInt(request.params.id);

    moviesRepo.find(movieId)
      .then((movie) => {
        if(movie) {
          moviesRepo.remove(movieId)
            .then(() => {
              response.status(204);
              response.send('Movie ' + movieId + ' deleted :D');
            })
            .catch((err) => {
              addInternalErrorResponse(response);
           });
        } else {
          addNotFoundResponse(response);
        }
      })
      .catch((err) => {
        addInternalErrorResponse(response);
      });    
  }

  function addNotFoundResponse(response) {
    response.status(404);
    response.send('Not found :(');
  }

  function addInternalErrorResponse(response) {
    response.status(500);
    response.send('Internal Server Error');
  }
}
