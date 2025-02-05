export async function getReviews(cmsReviews, id, page, pageSize) {

  const data = await cmsReviews.fetchReviews(id, page, pageSize);

  return data;

}