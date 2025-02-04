const cmsAdapter = {
  fetchReviews: async (page) => {
    const url = (`/api/reviews/${movieId}?page=${page}`);
    const res = await fetch(url)
    const data = await res.json();

    return data;
  }
}

export default cmsAdapter; 