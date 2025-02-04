import getReviews from "./reviews.js";
import cmsAdapter from "./fetchReviews.js";

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
      if (currentPage > 1) {
        currentPage--;
        getReviews(cmsAdapter, currentPage);
        nextButton.disabled = false;
      } else {
        prevButton.disabled = true;
      }
    });

    const nextButton = elem.querySelector('.review-next');
    nextButton.addEventListener('click', () => {
      if ((currentPage * 5) < this.reviews.pagination.total) {
        currentPage++;
        getReviews(cmsAdapter, currentPage);
        prevButton.disabled = false;
      } else {
        nextButton.disabled = true;
      }
    });
  }
}