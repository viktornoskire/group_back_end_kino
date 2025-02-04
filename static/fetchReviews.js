export default async function fetchReviews(page) {
  const url = (`/api/reviews/${movieId}?page=${page}`);
  const res = await fetch(url)
  const data = await res.json();
  console.log("fetch data", data);
  return data;
}