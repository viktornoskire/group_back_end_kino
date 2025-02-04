const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
  loadMovies: async () => {
    const res = await fetch(`${apiBase}/movies`);
    const payload = await res.json();
    return payload.data.map((movie) => ({
      id: movie.id,
      title: movie.attributes.title,
      image: movie.attributes.image,
    }));
  },

  loadReviews: async (movieId) => {
    const res = await fetch(`${apiBase}/reviews?filters[movie]=${movieId}`);
    const payload = await res.json();
    return payload.data;
  },
};

export default cmsAdapter;
