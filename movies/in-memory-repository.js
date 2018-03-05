const rawMovies = require('./data/movies.json');


module.exports = function MoviesRepository() {
  var serial = 0;
  var movies = [];

  this.findAll = () => {
    return new Promise((resolve, reject) => {
      resolve(movies);
    });
  }

  this.find = (id) => {
    return new Promise((resolve, reject) => {
      resolve(movies.find((m) => m.id === id));
    });
  }

  this.add = (movie) => {
    return new Promise((resolve, reject) => {
      movie.id = ++serial;
      movies.push(movie);
      resolve(movie.id);
    });
  }

  this.update = (id, movie) => {
    return new Promise((resolve, reject) => {
      const movieInx = movies.findIndex((m) => m.id === id);
      if (movieInx > -1) {
        movie.id = id;
        movies[movieInx] = movie;
        resolve();
      } else {
        reject('There is no movie ' + id);
      }
    });
  }

  this.remove = (id) => {
    return new Promise((resolve, reject) => {
      const movieInx = movies.findIndex((m) => m.id === id);
      if (movieInx !== -1) {
        movies.splice(movieInx, 1);
        resolve();
      } else {
        reject('There is no movie ' + id);
      }
    });
  }

  rawMovies.forEach((movie) => { this.add(movie); });
}
