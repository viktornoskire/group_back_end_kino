import fetchReviews from "./loadReviews.js";

document.addEventListener('DOMContentLoaded', function () {
  fetchReviews();
});

export default class loadReviews {
  constructor(reviews) {
    this.reviews = reviews;
  }

  render(elem) {
    const revUl = elem.querySelector('.review-ul');

    revUl.innerHTML = "";

    this.reviews.reviews.forEach(review => {
      const author = review.author;
      const rating = review.rating;
      const comment = review.comment;

      const revCom = elem.createElement('li');
      revCom.classList.add('review-li')
      revCom.innerHTML = `
    <p><strong>${author}</strong><p>
    <p>Betyg - ${rating}</p>
    <p>${comment}</p>`;

      revUl.appendChild(revCom);
    });

    let currentPage = this.reviews.pagination.page;

    const prevButton = elem.querySelector('.review-prev');
    prevButton.addEventListener("click", () => {
      console.log("prev", currentPage);
      if (currentPage > 1) {
        currentPage--;
        fetchReviews(currentPage)
      } else {
        prevButton.disabled = true;
      }
    });

    const nextButton = elem.querySelector('.review-next');
    nextButton.addEventListener('click', () => {
      console.log("next", currentPage);
      if ((currentPage * 5) < this.reviews.pagination.total) {
        currentPage++;
        fetchReviews(currentPage);
      } else {
        nextButton.disabled = true;
      }
    });
  }
}