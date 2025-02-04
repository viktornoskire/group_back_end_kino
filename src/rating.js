import { loadReviews, getImdbRating, loadMovie } from './movies.js';

export async function getMovieRating(movieId) {
  try {
    const reviews = await loadReviews(movieId);
    const movie = await loadMovie(movieId);

    if (reviews.length >= 5) {
      const ratings = reviews.map((review) => review.attributes.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      console.log(averageRating);
      return averageRating;
    } else {
      const imdbRating = await getImdbRating(movie.imdbId);
      return imdbRating;
    }
  } catch (error) {
    console.error(`Kunde inte hämta betyg till ${movieId}:`, error);
    return 0;
  }
}
