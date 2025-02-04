import cmsAdapter from "./fetchReviews.js";
import loadReviews from "./loadReviews.js";

export default async function getReviews(cmsAdapter, page) {
  const data = await cmsAdapter.fetchReviews(page);

  const dataReviews = new loadReviews(data);
  dataReviews.render(document);

}

getReviews(cmsAdapter);

