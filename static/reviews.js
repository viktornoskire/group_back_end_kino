
document.addEventListener('DOMContentLoaded', function () {
  async function fetchReviews (page) {
    const url = (`/api/reviews/${movieId}?page=${page}`);
    const res = await fetch(url)
    const data = await res.json();
   
    if (!data.pagination || data.pagination.page === "undefined" || data.pagination.pageCount === "undefined") {
      prevButton.disabled = true;
      nextButton.disabled = true;
    } else {
        prevButton.disabled = data.pagination.page === 1;
        nextButton.disabled = data.pagination.page >= data.pagination.pageCount;
    }

    const revUl = document.querySelector('.review-ul');
    revUl.innerHTML = "";

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

  let currentPage = 1;
  const prevButton = document.querySelector('.review-prev');
  prevButton.addEventListener("click", () =>{
    if (currentPage > 1) {
      currentPage--;
      fetchReviews(currentPage)
    }
  });

  const nextButton = document.querySelector('.review-next');
  nextButton.addEventListener('click', () =>{
    if(!nextButton.disabled){
      currentPage++;
      fetchReviews(currentPage);
    }
  });

  fetchReviews(currentPage);
});


 
