import { loadReviews, loadMovies } from './movies.js';

export async function top5Movies() {
  //Gets all the movies from the API
  const movies = await loadMovies();
  //Creates a date 30 days back in time.
  const thirtyDaysAgo = new Date(); //Todays date
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // 30 days ago, removoes 30 days from todays date.
  console.log(thirtyDaysAgo);

  //Gets all reviews, Promise.all lets us make several async calls at the same time.
  const moviesWithReviews = await Promise.all(
    //Go through each movie and gets it reviews.
    movies.map(async (movie) => {
      const reviews = await loadReviews(movie.id);
      // Logga alla reviews för varje film
      console.log(`\nRecensioner för film: ${movie.title}`);
      reviews.forEach((review) => {
        console.log(`- Datum: ${review.attributes.createdAt}, Betyg: ${review.attributes.rating}`);
      });
      return {
        ...movie,
        reviews,
      };
    })
  );

  const moviesWithRating = moviesWithReviews
    .map((movie) => {
      const validReviews = movie.reviews.filter((review) => {
        const reviewDate = new Date(review.attributes.createdAt);
        return review.attributes.rating > 0 && reviewDate >= thirtyDaysAgo;
      });

      const averageRating =
        validReviews.length > 0
          ? validReviews.reduce((sum, review) => sum + review.attributes.rating, 0) / validReviews.length
          : null;

      return {
        ...movie,
        averageRating,
        reviewCount: validReviews.length,
      };
    })
    .filter((movie) => movie.averageRating !== null);

  const topMovies = moviesWithRating.sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);

  console.log('\n=== SLUTRESULTAT ===');
  console.log('Topp 5 filmer (senaste 30 dagarna):');
  topMovies.forEach((movie, index) => {
    console.log(
      `${index + 1}. ${movie.title} - Betyg: ${movie.averageRating.toFixed(2)} (${movie.reviewCount} recensioner)`
    );
  });
  return topMovies;
}
