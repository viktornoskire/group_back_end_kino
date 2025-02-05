(async () => {
  if (document.querySelector('.movie-title')) {
    const movieId = window.location.pathname.split('/')[2];
    const res = await fetch(`/api/screenings/${movieId}`);
    const {rating} = await res.json();
    document.querySelector('.rating-rating').innerText = Math.round(rating);
  }
})();
