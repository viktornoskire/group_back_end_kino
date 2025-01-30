import { loadReviews, loadMovies } from './movies.js';

export async function top5Movies() {
  const movies = await loadMovies();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  console.log(thirtyDaysAgo);

  const moviesWithReviews = await Promise.all(
    movies.map(async (movie) => {
      const reviews = await loadReviews(movie.id);
      return {
        ...movie,
        reviews,
      };
    })
  );

  const moviesWithRatings = moviesWithReviews;
  console.log(moviesWithRatings);
}
