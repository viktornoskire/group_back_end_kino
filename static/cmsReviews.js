const api = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';

const cmsReviews = {
  fetchReviews: async (id, page, pageSize) => {

    pageSize = 5;

    const url = (`${api}?filters[movie]=${id}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`);

    const res = await fetch(url)
    const data = await res.json();

    const getReviews = {
      reviews: data.data.map(review => ({
        author: review.attributes.author,
        rating: review.attributes.rating,
        comment: review.attributes.comment,
      })),
      pagination: data.meta.pagination
    };

    return getReviews;
  }
}
export default cmsReviews;