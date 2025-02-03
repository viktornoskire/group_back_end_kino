import { loadReviews, getImdbRating } from './movies.js';

export async function getMovieRating(movieId) {
  try {
    const reviews = await loadReviews(movieId);

    if (reviews.length >= 5) {
      const ratings = reviews.map((review) => review.attributes.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return averageRating;
    } else {
      const imdbRating = await getImdbRating(movieTitle);
      return imdbRating;
    }
  } catch (error) {
    console.error(`Kunde inte hämta betyg till ${movieId}:`, error);
    return 0;
  }
}
