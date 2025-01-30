import { loadMovie, loadMovies, loadReview } from './src/movies.js';
import initialize from "./src/app.js";

const myAPI = {
  loadMovie,
  loadMovies,
  loadReview
}

const app = initialize(myAPI)

app.listen(5080);
