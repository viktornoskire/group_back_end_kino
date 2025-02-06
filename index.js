import { loadMovie, loadMovies } from './src/movies.js';
import initialize from './src/app.js';

const myAPI = {
  loadMovie,
  loadMovies,
};

const app = initialize(myAPI);

app.listen(5080);
