export async function getReviews(cmsReviews, id, page) {

  const data = await cmsReviews.fetchReviews(id, page);

  return data;

}
