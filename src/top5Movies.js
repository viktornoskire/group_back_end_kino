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
      // logging movies, will be removed later.
      console.log(`\nRecensioner för film: ${movie.title}`);
      reviews.forEach((review) => {
        console.log(`- Datum: ${review.attributes.createdAt}, Betyg: ${review.attributes.rating}`);
      });
      //returns movies with its reviews
      return {
        ...movie, //spreads out the movies properties
        reviews, //adds the reviews.
      };
    })
  );
  // count average rating for each movie
  const moviesWithRating = moviesWithReviews
    .map((movie) => {
      //filter out not valid reviews, has to have rating > 0 and be withing the date.
      const validReviews = movie.reviews.filter((review) => {
        const reviewDate = new Date(review.attributes.createdAt);
        return review.attributes.rating !== null && reviewDate >= thirtyDaysAgo;
      });
      // Count average rating if there are valid reviews.
      const averageRating =
        validReviews.length > 0
          ? validReviews.reduce((sum, review) => sum + review.attributes.rating, 0) / validReviews.length
          : null;
      //returns movie with its rating and number of reviews.
      return {
        ...movie,
        averageRating,
        reviewCount: validReviews.length,
      };
    })
    .filter((movie) => movie.averageRating !== null); //removes movies that does not have valid rating.

  //Sorts movies and choose the top 5.
  const topMovies = moviesWithRating
    .sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 5);

  console.log('\n=== SLUTRESULTAT ===');
  console.log('Topp 5 filmer (senaste 30 dagarna):');
  topMovies.forEach((movie, index) => {
    console.log(
      `${index + 1}. ${movie.title} - Betyg: ${movie.averageRating.toFixed(2)} (${movie.reviewCount} recensioner)`
    );
  });
  return topMovies;
}
