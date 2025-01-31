import { loadReviews, loadMovies } from './movies.js';

export async function top5Movies() {
  try {
    const movies = await loadMovies();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const moviesWithReviews = await Promise.all(
      movies.map(async (movie) => {
        try {
          const reviews = await loadReviews(movie.id);

          console.log(`\nRecensioner för film: ${movie.title}`);
          reviews.forEach((review) => {
            console.log(`- Datum: ${review.attributes.createdAt}, Betyg: ${review.attributes.rating}`);
          });

          return {
            ...movie,
            reviews,
          };
        } catch (error) {
          console.log(`Could not get review for ${movie.title}:`, error);
          return {
            ...movie,
            reviews: [],
          };
        }
      })
    );

    return moviesWithReviews; // Lägg till returvärde
  } catch (error) {
    console.error('Fel vid hämtning av filmer:', error);
    return []; // Returnera tom array vid fel
  }
}

// export async function top5Movies() {
//   //Gets all the movies from the API
//   const movies = await loadMovies();
//   //Creates a date 30 days back in time.
//   const thirtyDaysAgo = new Date(); //Todays date
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // 30 days ago, removoes 30 days from todays date.
//   console.log(thirtyDaysAgo);

//   //Gets all reviews, Promise.all lets us make several async calls at the same time.
//   const moviesWithReviews = await Promise.all(
//     //Go through each movie and gets it reviews.
//     movies.map(async (movie) => {
//       const reviews = await loadReviews(movie.id);
//       // logging movies, will be removed later.
//       console.log(`\nRecensioner för film: ${movie.title}`);
//       reviews.forEach((review) => {
//         console.log(`- Datum: ${review.attributes.createdAt}, Betyg: ${review.attributes.rating}`);
//       });
//       //returns movies with its reviews
//       return {
//         ...movie, //spreads out the movies properties
//         reviews, //adds the reviews.
//       };
//     })
//   );
//   // count average rating for each movie
//   const moviesWithRating = moviesWithReviews
//     .map((movie) => {
//       //filter out not valid reviews, has to have rating > 0 and be withing the date.
//       const validReviews = movie.reviews.filter((review) => {
//         const reviewDate = new Date(review.attributes.createdAt); //Makes the date to a date object
//         return review.attributes.rating !== null && reviewDate >= thirtyDaysAgo; //Only reviews from the latest 30 days with reviews are used
//       });
//       // Count average rating if there are valid reviews.
//       const averageRating =
//         validReviews.length > 0
//           ? validReviews.reduce((sum, review) => sum + review.attributes.rating, 0) / validReviews.length
//           : null; //IF there are no valid reviews, the rating is set to null.

//       //returns movie with its average review rating & number of valid reviews
//       return {
//         ...movie, //Keeps all movie data
//         averageRating, //adds the average rating
//         reviewCount: validReviews.length, //number of valid reviews
//       };
//     })
//     .filter((movie) => movie.averageRating !== null); //removes movies that does not have valid rating.

//   //Sorts movies and choose the top 5 based on the best rating and number of reviews.
//   const topMovies = moviesWithRating
//     .sort((a, b) => {
//       if (b.averageRating !== a.averageRating) {
//         return b.averageRating - a.averageRating; //sorts first based on best average rating.
//       }
//       return b.reviewCount - a.reviewCount; //If a movie has the same rating, it gets sorted based on most number of reviews.
//     })
//     .slice(0, 5); //takes the tyop 5 movies.

//   console.log('\n=== SLUTRESULTAT ===');
//   console.log('Topp 5 filmer (senaste 30 dagarna):');
//   topMovies.forEach((movie, index) => {
//     console.log(
//       `${index + 1}. ${movie.title} - Betyg: ${movie.averageRating.toFixed(2)} (${movie.reviewCount} recensioner)`
//     );
//   });
//   return topMovies;
// }
