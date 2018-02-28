const rawMovies = require('./data/movies.json');


module.exports = function MoviesRepository() {
  var serial = 0;
  var movies = [];

  this.findAll = () => {
    return movies;
  }

  this.find = (id) => {
    return movies.find((m) => m.id === id);
  }

  this.add = (movie) => {
    movie.id = ++serial;
    movies.push(movie);
    return movie.id;
  }

  this.update = (id, movie) => {
    const movieInx = movies.findIndex((m) => m.id === id);
    if (movieInx > -1) {
      movie.id = id;
      movies[movieInx] = movie;
    } else {
      throw 'There is no movie ' + id;
    }
  }

  this.remove = (id) => {
    const movieInx = movies.findIndex((m) => m.id === id);
    if (movieInx !== -1) {
      movies.splice(movieInx, 1);
    } else {
      throw 'There is no movie ' + id;
    }
  }

  rawMovies.forEach((movie) => { this.add(movie); });
}
