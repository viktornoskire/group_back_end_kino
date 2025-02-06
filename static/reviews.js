async function reviews(page) {

  page = page || 1;

  try {
    const response = await fetch(`/api/reviews/${movieId}/${page}`);
    const data = await response.json();

    const revUl = document.querySelector('.review-ul');
    revUl.innerHTML = "";

    data.reviews.forEach(review => {
      const revLi = document.createElement('li');
      revLi.classList.add('review-li');
      revUl.append(revLi);

      const revAut = document.createElement('p')
      revAut.textContent = "Namn: " + review.author;
      revLi.append(revAut);

      const revRat = document.createElement('p')
      revRat.textContent = "Betyg: " + review.rating;
      revLi.append(revRat);

      const revCom = document.createElement('p')
      revCom.textContent = "Kommentar: " + review.comment;
      revLi.append(revCom);

    });

    let currentPage = data.pagination.page;

    const prevButton = document.querySelector('.review-prev');
    if (currentPage == 1) {
      prevButton.disabled = true;
    }
    if (!prevButton.dataset.listener) {
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          reviews(currentPage);
          nextButton.disabled = false;
        } else {
          prevButton.disabled = true;
        }
      });
      prevButton.dataset.listener = 'true';
    }

    const nextButton = document.querySelector('.review-next');

    if (currentPage == data.pagination.pageCount) {
      nextButton.disabled = true;
    }
    if (!nextButton.dataset.listener) {
      nextButton.addEventListener('click', () => {
        if ((currentPage * 5) < data.pagination.total) {
          currentPage++;
          reviews(currentPage);
          prevButton.disabled = false;
        } else {
          nextButton.disabled = true;
        }
      });
      nextButton.dataset.listener = 'true';
    }
  } catch (error) {
    console.log('Couldnt get reviwes', error);
  }
}

reviews();

