import fetchReviews from "./fetchReviews.js";
import loadReviews from "./loadReviews.js";

export default async function getReviews(page) {
  const data = await fetchReviews(page);
  console.log("data", data);

  const dataReviews = new loadReviews(data);
  dataReviews.render(document);
}

getReviews(); 
