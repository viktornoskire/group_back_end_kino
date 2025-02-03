import loadReviews from "./reviews.js";

export default async function fetchReviews(page) {
  const url = (`/api/reviews/${movieId}?page=${page}`);
  const res = await fetch(url)
  const data = await res.json();

  const dataReviews = new loadReviews(data);
  dataReviews.render(document);
}