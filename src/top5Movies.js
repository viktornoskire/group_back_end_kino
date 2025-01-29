import { loadReviews, loadMovies } from './movies.js';

export async function top5Movies() {
  const movies = await loadMovies();
  const moviesWithRating = [];

  for (const movie of movies) {
    const reviews = await loadReviews(movie.id);

    if (reviews.length === 0) continue;

    const validReviews = reviews.filter((r) => r.attributes.rating !== null);
    if (validReviews.length === 0) continue;

    let totalRating = 0;
    for (const review of validReviews) {
      totalRating += review.attributes.rating;
    }
    const averageRating = totalRating / validReviews.length;

    moviesWithRating.push({
      ...movie,
      reviews: validReviews,
      averageRating,
    });
  }
  const topMovies = moviesWithRating.sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);

  console.log(
    '---------TOP 5 MOVIES:',
    topMovies.map((movie) => ({
      title: movie.title,
      averageRating: movie.averageRating,
    }))
  );
}
