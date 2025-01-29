import { loadReviews } from './movies.js';

export async function newReviews() {
  const reviews = await loadReviews();

  //Creates a date object which represents todays date and time.
  const today = new Date();
  //Creates a date object, but sets it 30 days back in time.
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  //Filter out so we only get the reviews that are 30 days old.
  const recentReviews = reviews.filter((review) => {
    //Creates a date object from each review createdAt-field, the date the review was created.
    const reviewDate = new Date(review.attributes.createdAt);
    //returns the reviewdate which is more or equal to thirty days ago.
    return reviewDate >= thirtyDaysAgo;
  });
  console.log('------------------RECENT REVIEWS (30 days):', recentReviews);
  return recentReviews;
}
