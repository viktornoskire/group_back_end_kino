const apiBase ='https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapterRating = {
  loadMovie: async (movieId) => {
    const res = await fetch(`${apiBase}/movies${movieId}`);
    const payload = await res.json();
    return easyObject(payload.data);
  },

  loadReviews: async (movieId) => {
    const res = await fetch(`${apiBase}/reviews?filters[movie]=${movieId}`);
    const payload = await res.json();
    return payload.data;
  },
};

export default cmsAdapterRating;