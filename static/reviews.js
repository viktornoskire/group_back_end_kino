
document.addEventListener('DOMContentLoaded', function () {
  async function fetchReviews (page) {
      const url = (`/api/reviews/${movieId}?page=${page}`);

    const res = await fetch(url)
    const data = await res.json();

  const revUl = document.querySelector('.review-ul');
  
  console.log('Recensioner: ', data);
  
  data.reviews.forEach(review => {
      const author = review.author;
      const rating = review.rating;
      const comment = review.comment;

      const revCom = document.createElement('li');
      revCom.classList.add('review-li')
      revCom.innerHTML = `
      <p><strong>${author}</strong><p>
      <p>Betyg - ${rating}</p>
      <p>${comment}</p>`;

      revUl.appendChild(revCom);
  });
}

fetchReviews();
});


 
